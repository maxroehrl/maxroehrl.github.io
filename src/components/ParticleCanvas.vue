<template>
  <section id="particles">
    <h1>Particle System</h1>
    <ul>
      <li>
        <div class="bottom-group-hor">
          <div ref="inputs-wrapper" class="inputs-wrapper">
            <h3>Configuration</h3>
            <template v-for="(_, key) in config" :key="key">
              <label :for="key">
                {{ key }}:
              </label>
              <input
                :id="key"
                v-model.number="config[key]"
                type="number">
            </template>
            <button @click="reset(true)">
              Restart
            </button>
          </div>
          <div class="counts-wrapper">
            <h3>Counts</h3>
            <template v-for="(_, key) in stats" :key="key">
              <label>
                {{ key }}:
              </label>
              <span :style="{color: colors[key]}">
                {{ stats[key] }}
              </span>
            </template>
            <label>time:</label>
            <span>{{ time }}</span>
          </div>
          <div class="plot">
            <h3>Change over time</h3>
            <div ref="plot-scroller" class="plot-scroller">
              <div class="plot-wrapper" :style="{height: plot.height + 'px', width: plot.width + 'px'}">
                <canvas ref="plot" />
              </div>
            </div>
          </div>
        </div>
        <div class="canvas-wrapper">
          <canvas ref="particles" @click="canvasClicked()" />
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export const State = Object.freeze({
  RECOVERED: -1,
  HEALTHY: 0,
});
export default {
  data() {
    return {
      FIXED_MASS: 9e9,
      MOVING_MASS: 1,
      paused: true,
      timeoutHandle: undefined,
      time: 0,
      oldWidth: window.innerWidth,
      particles: [],
      particleContext: undefined,
      plot: {
        context: undefined,
        height: 218,
        width: 1,
        initialWidth: undefined,
        updateAfterTicks: 1,
      },
      config: {
        totalPart: 200,
        radiusPart: 6,
        maxVelocity: 4,
        tickRate: 16,
        duration: 200,
        quarantineAfter: 70,
        quarantineProb: 80,
        movingProp: 80,
        infectionProb: 100,
        infectedProp: 1,
      },
      stats: {
        healthy: 200,
        infected: 0,
        recovered: 0,
        quarantined: 0,
        total: 200,
      },
      colors: {
        healthy: '#9c9c9c',
        initiallyInfected: '#ff371c',
        infected: '#ff6428',
        recovered: '#21a84b',
        quarantined: '#ffa30f',
      },
      boundaries: {
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
      },
    };
  },

  mounted() {
    this.init();
    this.drawParticles(this.particles, this.particleContext);
    window.addEventListener('resize', this.onResize.bind(this));
    this.timeoutHandle = setTimeout(this.tick.bind(this), this.config.tickRate);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.onResize.bind(this));
  },

  methods: {
    /**
     * Initialize all particles and particle counts.
     */
    init() {
      this.initCanvasSizes();
      this.time = 0;
      this.stats = {
        healthy: this.config.totalPart,
        recovered: 0,
        quarantined: 0,
        infected: 0,
        total: this.config.totalPart,
      };
      this.particles = [];
      for (let i = 0; i < this.config.totalPart; i++) {
        let isInfected = this.random(0, 100) <= this.config.infectedProp;
        this.stats.infected += isInfected ? 1 : 0;
        const isFixed = this.random(0, 100) >= this.config.movingProp;
        const placement = this.getPlacement(this.particles, this.boundaries.maxX, this.boundaries.maxY, this.config.radiusPart);
        // We need at least one infected
        if (i + 1 === this.config.totalPart && this.stats.infected === 0) {
          isInfected = true;
          this.stats.infected += 1;
        }
        const particle = {
          id: i,
          x: placement.x,
          y: placement.y,
          vx: isFixed ? 0 : this.getVelocity(this.config.maxVelocity),
          vy: isFixed ? 0 : this.getVelocity(this.config.maxVelocity),
          r: this.config.radiusPart,
          fill: isInfected ? this.colors.initiallyInfected : this.colors.healthy,
          state: isInfected ? this.config.duration : State.HEALTHY,
          mass: isFixed ? this.FIXED_MASS: this.MOVING_MASS,
          collidedWith: [],
        };
        this.particles.push(particle);
      }
    },

    /**
     * Initialize the canvas sizes.
     */
    initCanvasSizes() {
      const particleCanvas = this.$refs['particles'];
      this.particleContext = particleCanvas.getContext('2d');
      this.boundaries.maxX = particleCanvas.parentElement.clientWidth;
      this.boundaries.maxY = particleCanvas.parentElement.clientHeight;
      particleCanvas.width = this.boundaries.maxX;
      particleCanvas.height = this.boundaries.maxY;

      const plotCanvas = this.$refs['plot'];
      this.plot.context = plotCanvas.getContext('2d');
      // Subtract the height of the header and the scrollbar
      this.plot.height = this.$refs['inputs-wrapper'].clientHeight - 38 - 13;
      plotCanvas.width = 4000;
      plotCanvas.height = this.plot.height;
    },

    /**
     * Move all particles and update their state in the particle canvas.
     */
    tick() {
      if (!this.paused) {
        this.clear(this.particleContext, this.boundaries.maxX, this.boundaries.maxY);
        this.updateParticles(this.particles);
        this.drawParticles(this.particles, this.particleContext);

        // Update stats and draw plot
        this.stats.healthy = this.stats.total - this.stats.infected - this.stats.recovered;
        if (this.time % this.plot.updateAfterTicks === 0) {
          const time = this.time / this.plot.updateAfterTicks;
          // Increase the with of the plot wrapper to show more of the big canvas
          this.plot.width += 1;
          this.$refs['plot-scroller'].scrollLeft += 1;
          // In the plot we do not count quarantined as part of infected particles
          const stats = Object.assign({}, this.stats);
          stats.infected -= stats.quarantined;
          this.plotStats(
              stats,
              time,
              this.plot.context,
              this.plot.height,
              this.colors,
          );
        }
        this.time += 1;
      }
      this.timeoutHandle = setTimeout(this.tick.bind(this), this.config.tickRate);
    },

    /**
     * Draw all the particles on the canvas.
     *
     * @param {array} particles The list of all particles
     * @param {CanvasRenderingContext2D} context The canvas context
     */
    drawParticles(particles, context) {
      particles.forEach((particle) => {
        this.drawCircle(particle.x, particle.y, particle.r, particle.fill, context);
      });
    },

    /**
     * Clear the canvas
     *
     * @param {CanvasRenderingContext2D} context The canvas context
     * @param {number} width The canvas width
     * @param {number} height The canvas height
     */
    clear(context, width, height) {
      context.clearRect(0, 0, width, height);
    },

    /**
     * Draw a circle on the canvas.
     *
     * @param {number} x The x coordinate
     * @param {number} y The y coordinate
     * @param {number} r The circle radius
     * @param {string} fill The fill color
     * @param {CanvasRenderingContext2D} context The canvas context
     */
    drawCircle(x, y, r, fill, context) {
      context.fillStyle = fill;
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2);
      context.closePath();
      context.fill();
    },

    canvasClicked() {
      if (this.stats.infected === 0) {
        this.reset(true);
      } else {
        this.paused = !this.paused;
      }
    },

    /**
     * On resize callback
     *
     * @param {object} event The resize event
     */
    onResize(event) {
      if (this.oldWidth !== event.target.innerWidth) {
        setTimeout(this.reset.bind(this, false), 250);
        this.oldWidth = event.target.innerWidth;
      }
    },

    /**
     * Reset the plot and the particles and reinitialize.
     *
     * @param {boolean} restart Force restart flag
     */
    reset(restart) {
      clearTimeout(this.timeoutHandle);
      this.clear(this.plot.context, this.plot.width, this.plot.height);
      this.plot.width = 1;
      this.clear(this.particleContext, this.boundaries.maxX, this.boundaries.maxY);
      this.init();
      this.drawParticles(this.particles, this.particleContext);
      this.paused = restart ? false : this.paused;
      this.timeoutHandle = setTimeout(this.tick.bind(this), this.config.tickRate);
    },

    /**
     * Update the state of all particles before drawing
     *
     * @param {array} particles The list of all particles
     */
    updateParticles(particles) {
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.collidedWith = [];
      });
      particles.forEach((particle) => {
        const collisions = this.getCollisions(particles, particle);
        // Filter particles which were processed in previous iterations
        collisions.filter((p) => !p.collidedWith.includes(particle))
            .forEach((p) => {
              // Process the collision of a unique pair
              this.updateVelocities(particle, p);
              particle.collidedWith.push(p);
            });
        this.processWallCollision(particle, this.boundaries);
        this.infectParticle(particle, collisions, this.config.infectionProb);
        this.recoverParticle(particle);
        this.quarantineParticle(particle, this.config.quarantineProb);
      });
    },

    /**
     * Recover particle after a certain duration.
     *
     * @param {object} particle The particle to update
     */
    recoverParticle(particle) {
      if (particle.state > State.HEALTHY) {
        particle.state -= 1;
        if (particle.state === State.HEALTHY) {
          if (particle.fill === this.colors.quarantined) {
            this.stats.quarantined -= 1;
          }
          // Particle has recovered from infection
          particle.state = State.RECOVERED;
          particle.fill = this.colors.recovered;
          this.stats.recovered += 1;
          this.stats.infected -= 1;
          if (this.stats.infected === 0) {
            this.paused = true;
          }
        }
      }
    },

    /**
     * Set a particle to a fixed position after a certain duration.
     *
     * @param {object} particle The particle to update
     * @param {number} probability The quarantine probability
     */
    quarantineParticle(particle, probability) {
      if (particle.state > State.HEALTHY &&
          particle.state < this.config.duration - this.config.quarantineAfter &&
          particle.fill !== this.colors.quarantined &&
          this.random(0, 100) <= probability) {
        // Particle got quarantined
        particle.mass = this.FIXED_MASS;
        particle.fill = this.colors.quarantined;
        particle.vx = 0;
        particle.vy = 0;
        this.stats.quarantined += 1;
      }
    },

    /**
     * Infect the particle if the particle collides with infected particles.
     *
     * @param {object} particle The particle to update
     * @param {array} collisions The particles which currently collide with particle
     * @param {number} probability The infection probability
     */
    infectParticle(particle, collisions, probability) {
      if (particle.state === State.HEALTHY &&
          collisions.filter((p) => p.state > State.HEALTHY).length &&
          this.random(0, 100) <= probability) {
        // Particle got infected
        particle.state = this.config.duration;
        particle.fill = this.colors.infected;
        this.stats.infected += 1;
      }
    },

    /**
     * Update the velocities of the two colliding particles
     * based on https://en.wikipedia.org/wiki/Elastic_collision
     * with angle-free representation in 2D.
     *
     * @param {{x: number, y: number, mass: number, vx: number, vy: number}} particle1 Particle 1
     * @param {{x: number, y: number, mass: number, vx: number, vy: number}} particle2 Particle 2
     */
    updateVelocities(particle1, particle2) {
      // Compute relative velocities
      const vxRel = particle1.vx - particle2.vx;
      const vyRel = particle1.vy - particle2.vy;
      // Compute relative locations
      const xRel = particle1.x - particle2.x;
      const yRel = particle1.y - particle2.y;
      // Compute dot product of relative location and relative velocity
      const locationDotVelocity = xRel * vxRel + yRel * vyRel;
      if (locationDotVelocity > 0) {
        // Compute dot product of relative location and relative location
        const relLocationSquared = xRel * xRel + yRel * yRel;
        const collisionScale = locationDotVelocity / relLocationSquared;
        const xCollision = xRel * collisionScale - vxRel;
        const yCollision = yRel * collisionScale - vyRel;
        // Compute masses
        const massSum = particle1.mass + particle2.mass;
        const mass1 = 2 * particle2.mass / massSum;
        const mass2 = 2 * particle1.mass / massSum;
        // Update the velocities
        particle1.vx += mass1 * xCollision;
        particle1.vy += mass1 * yCollision;
        particle2.vx -= mass2 * xCollision;
        particle2.vy -= mass2 * yCollision;
      }
    },

    /**
     * Return the list of all particles colliding with particle.
     * The 2-norm is used to determine if two particles overlap.
     *
     * @param {[{x: number, y: number, r: number, id: number, collidedWith: array}]} particles The list of all particles
     * @param {{x: number, y: number, r: number, id: number}} particle The particle to check for collisions with other particles
     * @return {array} The list of particles colliding with particle
     */
    getCollisions(particles, particle) {
      return particles.filter((p) => {
        const xDiff = p.x - particle.x;
        const yDiff = p.y - particle.y;
        return (p.id !== particle.id) && (xDiff * xDiff + yDiff * yDiff <= 4 * p.r * p.r);
      });
    },

    /**
     * Update the particle position and velocity if the x or y position is near a wall.
     *
     * @param {{x: number, y: number, r: number, vx: number, vy: number}} particle The particle to check and update if necessary
     * @param {{minX: number, maxX: number, minY: number, maxY: number}} boundaries The boundaries of the canvas
     */
    processWallCollision(particle, boundaries) {
      const r = particle.r;
      const crossedMinX = Math.abs(particle.x - boundaries.minX) < r;
      const crossedMaxX = Math.abs(particle.x - boundaries.maxX) < r;
      const crossedMinY = Math.abs(particle.y - boundaries.minY) < r;
      const crossedMaxY = Math.abs(particle.y - boundaries.maxY) < r;
      // Set location back to inside the boundaries
      if (crossedMinX) {
        particle.x = boundaries.minX + r;
      } else if (crossedMaxX) {
        particle.x = boundaries.maxX - r;
      }
      if (crossedMinY) {
        particle.y = boundaries.minY + r;
      } else if (crossedMaxY) {
        particle.y = boundaries.maxY - r;
      }
      // Let the particle bounce of the wall
      if (crossedMinX || crossedMaxX) {
        particle.vx *= -1;
      }
      if (crossedMinY || crossedMaxY) {
        particle.vy *= -1;
      }
    },

    /**
     * Get a random number between from and to.
     *
     * @param {number} from Minimum
     * @param {number} to Maximum
     * @return {number} The random number
     */
    random(from, to) {
      return Math.round(Math.random() * (to - from) + from);
    },

    /**
     * Get the placement of a particle between 0 and maxY or maxY.
     * The new placement should not overlap with existing ones.
     *
     * @param {array} particles List of particles with x and y coordinates
     * @param {number} maxX Maximal x coordinate
     * @param {number} maxY Maximal y coordinate
     * @param {number} radius Radius of a particle
     * @return {{x: number, y: number}} The placement of a particle in the wall without overlap
     */
    getPlacement(particles, maxX, maxY, radius) {
      const x = this.random(radius + 1, maxX - radius - 1);
      const y = this.random(radius + 1, maxY - radius - 1);
      if (this.getCollisions(particles, {x, y, r: radius, id: -1}).length) {
        // Compute another location because the particle overlaps with another particle
        return this.getPlacement(particles, maxX, maxY, radius);
      }
      return {x, y};
    },

    /**
     * Get a random velocity which is not 0.
     *
     * @param {number} maxVelocity The maximal velocity
     * @return {number} The random velocity
     */
    getVelocity(maxVelocity) {
      const velocity = this.random(-maxVelocity, maxVelocity);
      return velocity === 0 ? this.getVelocity(maxVelocity) : velocity;
    },

    /**
     * Plot the number of healthy, infected and recovered particles in the canvas context.
     *
     * @param {object} stats The infection statistics
     * @param {number} time The current time or x value
     * @param {CanvasRenderingContext2D} context The canvas context
     * @param {number} height Height of the canvas
     * @param {object} colors The colors used for healthy, infected and recovered particles
     */
    plotStats(stats, time, context, height, colors) {
      let y = height;
      const plot = (prop) => {
        const scaled = stats[prop] / stats.total * height;
        y -= scaled;
        context.fillStyle = colors[prop];
        context.fillRect(time, y, 1, scaled);
      };
      plot('healthy');
      plot('recovered');
      plot('quarantined');
      plot('infected');
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../colors";

  input {
    width: 50px;
  }

  button {
    width: 100%;
  }

  h3 {
    margin: 8px 0;
    min-width: 135px;
    white-space: nowrap;
  }

  .bottom-group-hor {
    align-items: baseline;
    justify-content: flex-start;
    margin: 0;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .inputs-wrapper, .counts-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    margin-right: 10px;
  }

  .inputs-wrapper {
    width: 175px;
    min-width: 175px;
  }

  .counts-wrapper {
    width: 140px;
    min-width: 140px;

    label {
      min-width: 80px;
    }
  }

  .canvas-wrapper {
    height: 400px;
    margin-top: 10px;
    background: $light-card-bg2;
    border: 1px solid $light-card-border;
  }

  .plot {
    width: 100%;
    min-width: 165px;

    .plot-scroller {
      width: 100%;
      height: 100%;
      overflow-x: auto;
      overflow-y: hidden;

      .plot-wrapper {
        overflow-x: hidden;
        overflow-y: hidden;

        canvas {
          width: 4000px;
          height: 100%;
        }
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    .canvas-wrapper {
      background: $dark-card-bg2;
      border-color: $dark-card-border;
    }
  }
</style>
