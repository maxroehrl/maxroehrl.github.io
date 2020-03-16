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
          <canvas ref="particles" @click="paused = !paused" />
        </div>
        <h3>Counts</h3>
        <div class="counts-wrapper">
          Recovered: <span :style="{color: recoveredColor}">{{ recovered }}</span>
          Infected: <span :style="{color: infectedColor}">{{ currInfected }}</span>
          Healthy: <span :style="{color: healthyColor}">{{ count - currInfected - recovered }}</span>
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
      count: 200,
      currInfected: 0,
      radius: 6,
      maxVelocity: 5,
      recovered: 0,
      moving: 80,
      infectionProbability: 100,
      infected: 1,
      duration: 500,
      healthyColor: '#9c9c9c',
      initiallyInfectedColor: '#ff371c',
      infectedColor: '#ff6428',
      recoveredColor: '#21a84b',
      paused: true,
      time: 0,
      plotUpdate: 3,
      plotHeight: undefined,
    };
  },

  mounted() {
    const particleCanvas = this.$refs['particles'];
    this.particleContext = particleCanvas.getContext('2d');
    this.width = particleCanvas.parentElement.clientWidth;
    this.height = particleCanvas.parentElement.clientHeight;
    particleCanvas.width = this.width;
    particleCanvas.height = this.height;

    const plotCanvas = this.$refs['plot'];
    this.plotContext = plotCanvas.getContext('2d');
    this.plotHeight = plotCanvas.parentElement.clientHeight;

    this.init();
    setInterval(this.tick.bind(this), 16);
  },

  methods: {
    init() {
      this.time = 0;
      this.recovered = 0;
      this.particles = [];
      this.currInfected = 0;
      for (let i = 0; i < this.count; i++) {
        let infected = this.random(0, 100) <= this.infected;
        this.currInfected += infected ? 1 : 0;
        const fixed = this.random(0, 100) >= this.moving;
        const placement = this.getPlacement(this.particles, this.width, this.height);
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
          fill: infected ? this.initiallyInfectedColor : this.healthyColor,
          state: infected ? this.duration : State.HEALTHY,
        };
        this.particles.push(particle);
      }
    },

    tick() {
      if (!this.paused) {
        this.clear();
        this.updateParticles(this.particles);
        this.drawParticles(this.particles);
        if (this.time % this.plotUpdate === 0) {
          this.plotStats(this.count - this.currInfected - this.recovered, this.currInfected, this.recovered, this.time / this.plotUpdate);
        }
        this.time += 1;
      }
    },

    drawParticles(particles) {
      particles.forEach((particle) => {
        this.drawCircle(particle.x, particle.y, particle.r, particle.fill);
      });
    },

    clear() {
      this.particleContext.clearRect(0, 0, this.width, this.height);
    },

    drawCircle(x, y, r, fill) {
      this.particleContext.fillStyle = fill;
      this.particleContext.beginPath();
      this.particleContext.arc(x, y, r, 0, Math.PI * 2);
      this.particleContext.closePath();
      this.particleContext.fill();
    },

    reset() {
      this.plotContext.clearRect(0, 0, this.width, this.height);
      this.clear();
      this.paused = false;
      this.init();
    },

    updateParticles(particles) {
      particles.forEach((particle) => {
        this.getWallCollision(particle);

        particle.x += particle.vx;
        particle.y += particle.vy;

        const collisions = this.getCollisions(particles, particle);
        if (collisions.length) {
          const o = collisions[0];
          const xVelocity = o.vx - particle.vx;
          const yVelocity = o.vy - particle.vy;
          const xDist = o.x - particle.x;
          const yDist = o.y - particle.y;
          const dotProduct = xDist * xVelocity + yDist * yVelocity;
          if (dotProduct > 0 && !particle.updated) {
            const distSquared = xDist * xDist + yDist * yDist;
            const collisionScale = dotProduct / distSquared;
            const xCollision = xDist * collisionScale;
            const yCollision = yDist * collisionScale;
            particle.vx += xCollision;
            particle.vy += yCollision;
            o.vx -= xCollision;
            o.vy -= yCollision;
            // o.updated = true;
            particle.x += particle.vx;
            particle.y += particle.vy;
            // o.x += 2 * o.vx;
            // o.y += 2 * o.vy;
          }

          if (particle.state === State.HEALTHY &&
              collisions.filter((p) => p.state > State.HEALTHY).length &&
              this.random(0, 100) <= this.infectionProbability) {
            this.currInfected += 1;
            particle.state = this.duration;
            particle.fill = this.infectedColor;
          }
        }

        if (particle.state > State.HEALTHY) {
          particle.state -= 1;
          if (particle.state === State.HEALTHY) {
            particle.state = State.RECOVERED;
            particle.fill = this.recoveredColor;
            this.recovered += 1;
            this.currInfected -= 1;
          }
        }
      });
      particles.forEach((particle) => {
        particle.updated = false;
      });
    },

    getCollisions(particles, particle) {
      return particles.filter((p) => {
        const xDiff = p.x - particle.x;
        const yDiff = p.y - particle.y;
        return (p.id !== particle.id) && (xDiff * xDiff + yDiff * yDiff <= 4 * p.r * p.r);
      });
    },

    getWallCollision(particle) {
      const d = particle.r;
      if (particle.x <= d || Math.abs(particle.x - this.width) <= d) {
        particle.vx *= -1;
      }
      if (particle.y <= d || Math.abs(particle.y - this.height) <= d) {
        particle.vy *= -1;
      }
    },

    random(from, to) {
      return parseInt(Math.random() * (to - from) + from);
    },

    getPlacement(particles, maxX, maxY, x, y) {
      if (x === undefined || y === undefined) {
        x = this.random(this.radius + 1, maxX - this.radius - 1);
        y = this.random(this.radius + 1, maxY - this.radius - 1);
      }
      if (this.getCollisions(particles, {x, y}).length) {
        return this.getPlacement(particles, maxX, maxY);
      }
      return {x, y};
    },

    getVelocity(maxVelocity) {
      const velocity = this.random(-maxVelocity, maxVelocity);
      return velocity === 0 ? this.getVelocity(maxVelocity) : velocity;
    },

    plotStats(healthy, infected, recovered, time) {
      const h = healthy / this.count * this.plotHeight;
      this.plotContext.fillStyle = this.healthyColor;
      this.plotContext.fillRect(time, this.plotHeight - h, 1, h);

      const i = infected / this.count * this.plotHeight;
      this.plotContext.fillStyle = this.infectedColor;
      this.plotContext.fillRect(time, this.plotHeight - h - i, 1, i);

      const r = recovered / this.count * this.plotHeight;
      this.plotContext.fillStyle = this.recoveredColor;
      this.plotContext.fillRect(time, 0, 1, r);
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
    width: 115px;
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
