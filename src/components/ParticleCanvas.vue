<template>
  <section id="contact">
    <h1>Particle System</h1>
    <ul>
      <li>
        <div class="bottom-group-hor">
          <div class="inputs-wrapper">
            <h3>Configuration</h3>
            <label for="total">Total:</label>
            <input id="total"
                   v-model.number="count"
                   type="number">
            <label for="infected">Infected:</label>
            <input id="infected"
                   v-model.number="infected"
                   type="number">
            <label for="moving">Moving:</label>
            <input id="moving"
                   v-model.number="moving"
                   type="number">
            <label for="duration">Duration:</label>
            <input id="duration"
                   v-model.number="duration"
                   type="number">
            <label for="maxVelocity">Max Velo:</label>
            <input id="maxVelocity"
                   v-model.number="maxVelocity"
                   type="number">
            <label for="infectionProbability">Inf. Prob:</label>
            <input id="infectionProbability"
                   v-model.number="infectionProbability"
                   type="number">
            <button @click="reset()">
              Reset
            </button>
          </div>
          <div class="plot">
            <h3>Change over time</h3>
            <div class="plot-wrapper">
              <canvas ref="plot" />
            </div>
          </div>
        </div>
        <div class="canvas-wrapper">
          <canvas ref="particles" @click="canvasClicked()" />
        </div>
        <h3>Counts</h3>
        <div class="counts-wrapper">
          Recovered: <span :style="{color: colors.recovered}">{{ recovered }}</span>
          Infected: <span :style="{color: colors.infected}">{{ currInfected }}</span>
          Healthy: <span :style="{color: colors.healthy}">{{ count - currInfected - recovered }}</span>
          Time/Ticks: <span>{{ time }}</span>
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
      particleContext: undefined,
      plotContext: undefined,
      fixedMass: 9e9,
      count: 200,
      currInfected: 0,
      radius: 6,
      maxVelocity: 4,
      recovered: 0,
      quarantined: 0,
      quarantineAfter: 70,
      quarantineProb: 80,
      moving: 80,
      infectionProbability: 100,
      infected: 1,
      tickTime: 16,
      duration: 200,
      colors: {
        healthy: '#9c9c9c',
        initiallyInfected: '#ff371c',
        infected: '#ff6428',
        recovered: '#21a84b',
        quarantined: '#ffa30f',
      },
      paused: true,
      time: 0,
      plotUpdate: 3,
      plotHeight: undefined,
      plotWidth: undefined,
      walls: undefined,
    };
  },

  mounted() {
    const particleCanvas = this.$refs['particles'];
    this.particleContext = particleCanvas.getContext('2d');
    this.width = particleCanvas.parentElement.clientWidth;
    this.height = particleCanvas.parentElement.clientHeight;
    particleCanvas.width = this.width;
    particleCanvas.height = this.height;
    this.walls = {
      minX: 0,
      maxX: this.width,
      minY: 0,
      maxY: this.height,
    };

    const plotCanvas = this.$refs['plot'];
    this.plotContext = plotCanvas.getContext('2d');
    this.plotHeight = plotCanvas.parentElement.clientHeight;
    this.plotWidth = plotCanvas.parentElement.clientWidth;

    this.init();
    window.addEventListener('resize', this.reset.bind(this));
    setInterval(this.tick.bind(this), this.tickTime);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.reset.bind(this));
  },

  methods: {
    /**
     * Initialize all particles and particle counts.
     */
    init() {
      this.time = 0;
      this.recovered = 0;
      this.quarantined = 0;
      this.particles = [];
      this.currInfected = 0;
      for (let i = 0; i < this.count; i++) {
        let infected = this.random(0, 100) <= this.infected;
        this.currInfected += infected ? 1 : 0;
        const fixed = this.random(0, 100) >= this.moving;
        const placement = this.getPlacement(this.particles, this.width, this.height, this.radius);
        if (i + 1 === this.count && this.currInfected === 0) {
          infected = true;
          this.currInfected +=1;
        }
        const particle = {
          id: i,
          x: placement.x,
          y: placement.y,
          vx: fixed ? 0 : this.getVelocity(this.maxVelocity),
          vy: fixed ? 0 : this.getVelocity(this.maxVelocity),
          r: this.radius,
          fill: infected ? this.colors.initiallyInfected : this.colors.healthy,
          state: infected ? this.duration : State.HEALTHY,
          mass: fixed ? this.fixedMass: 1,
          collidedWith: [],
        };
        this.particles.push(particle);
      }
    },

    /**
     * Move all particles and update their state in the particle canvas.
     */
    tick() {
      if (!this.paused) {
        this.clear(this.particleContext, this.width, this.height);
        this.updateParticles(this.particles);
        this.drawParticles(this.particles, this.particleContext);
        if (this.time % this.plotUpdate === 0) {
          const stats = {
            healthy: this.count - this.currInfected - this.recovered,
            infected: this.currInfected, // - this.quarantined,
            quarantined: this.quarantined,
            recovered: this.recovered,
            total: this.count,
          };
          this.plotStats(
              stats,
              this.time / this.plotUpdate,
              this.plotContext,
              this.plotHeight,
              this.colors,
          );
        }
        this.time += 1;
      }
    },

    /**
     * Draw all the particles on the canvas.
     *
     * @param {array} particles The list of all particles
     * @param {object} context The canvas context
     */
    drawParticles(particles, context) {
      particles.forEach((particle) => {
        this.drawCircle(particle.x, particle.y, particle.r, particle.fill, context);
      });
    },

    /**
     * Clear the canvas
     *
     * @param {object} context The canvas context
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
     * @param {object} context The canvas context
     */
    drawCircle(x, y, r, fill, context) {
      context.fillStyle = fill;
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2);
      context.closePath();
      context.fill();
    },

    canvasClicked() {
      if (this.currInfected === 0) {
        this.reset();
      } else {
        this.paused = !this.paused;
      }
    },

    /**
     * Reset the plot and the particles and reinitialize.
     */
    reset() {
      this.clear(this.plotContext, this.plotWidth, this.plotHeight);
      this.clear(this.particleContext, this.width, this.height);
      this.paused = false;
      this.init();
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
        this.processWallCollision(particle, this.walls);
        this.infectParticle(particle, collisions, this.infectionProbability);
        this.recoverParticle(particle);
        this.quarantineParticle(particle, this.quarantineProb);
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
            this.quarantined -= 1;
          }
          // Particle has recovered from infection
          particle.state = State.RECOVERED;
          particle.fill = this.colors.recovered;
          this.recovered += 1;
          this.currInfected -= 1;
          if (this.currInfected === 0) {
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
          particle.state < this.duration - this.quarantineAfter &&
          particle.fill !== this.colors.quarantined &&
          this.random(0, 100) <= probability) {
        // Particle got quarantined
        particle.mass = this.fixedMass;
        particle.fill = this.colors.quarantined;
        particle.vx = 0;
        particle.vy = 0;
        this.quarantined += 1;
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
        particle.state = this.duration;
        particle.fill = this.colors.infected;
        this.currInfected += 1;
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
     * @param {{fillStyle: string, fillRect: function}} context
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
  }

  .bottom-group-hor {
    align-items: baseline;
    justify-content: flex-start;
    margin: 0;
  }

  .inputs-wrapper, .counts-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    margin-right: 10px;
  }

  .inputs-wrapper {
    width: 155px;
  }

  .counts-wrapper {
    width: 125px;
  }

  .canvas-wrapper {
    height: 400px;
    margin-top: 10px;
    background: $light-card-bg2;
    border: 1px solid $light-card-border;
  }

  .plot {
    width: 100%;

    .plot-wrapper {
      width: 100%;
      height: 147px;

      canvas {
        width: 100%;
        height: 100%;
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
