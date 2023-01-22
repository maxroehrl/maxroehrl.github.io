<template>
  <section id="particles">
    <h1>Particle System</h1>
    <ul>
      <li>
        <div class="bottom-group-hor">
          <div ref="inputsWrapper" class="inputs-wrapper">
            <h3>Configuration</h3>
            <template v-for="(_, key) in config" :key="key">
              <label :for="key"> {{ key }}: </label>
              <input :id="key" v-model.number="config[key]" type="number" />
            </template>
            <button @click="reset(true)">Restart</button>
          </div>
          <div class="counts-wrapper">
            <h3>Counts</h3>
            <template v-for="(_, key) in stats" :key="key">
              <label> {{ key }}: </label>
              <span :style="{ color: colors[key] }">
                {{ stats[key] }}
              </span>
            </template>
            <label>time:</label>
            <span>{{ time }}</span>
          </div>
          <div class="plot">
            <h3>Change over time</h3>
            <div ref="plotScroller" class="plot-scroller">
              <div
                class="plot-wrapper"
                :style="{
                  height: plot.height + 'px',
                  width: plot.width + 'px',
                }">
                <canvas ref="plotCanvas" />
              </div>
            </div>
          </div>
        </div>
        <div class="canvas-wrapper">
          <canvas ref="particlesCanvas" @click="canvasClicked()" />
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { onUnmounted, onMounted, ref } from 'vue';

const State = Object.freeze({
  RECOVERED: -1,
  HEALTHY: 0,
});
const FIXED_MASS = 9e9;
const MOVING_MASS = 1;
let paused = true;
let timeoutHandle;
const time = ref(0);
let oldWidth = window.innerWidth;
let particles = [];
let particleContext;
const plot = ref({
  context: undefined,
  height: 218,
  width: 1,
  initialWidth: undefined,
  updateAfterTicks: 1,
});
const config = ref({
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
});
const stats = ref({
  healthy: 200,
  infected: 0,
  recovered: 0,
  quarantined: 0,
  total: 200,
});
const colors = ref({
  healthy: '#9c9c9c',
  initiallyInfected: '#ff371c',
  infected: '#ff6428',
  recovered: '#21a84b',
  quarantined: '#ffa30f',
});
const boundaries = ref({
  minX: 0,
  maxX: 0,
  minY: 0,
  maxY: 0,
});
const inputsWrapper = ref();
const plotCanvas = ref();
const plotScroller = ref();
const particlesCanvas = ref();

onMounted(() => {
  init();
  drawParticles(particles, particleContext);
  window.addEventListener('resize', onResize.bind(this));
  timeoutHandle = setTimeout(tick, config.value.tickRate);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize.bind(this));
});

/**
 * Initialize all particles and particle counts.
 */
function init() {
  initCanvasSizes();
  time.value = 0;
  stats.value = {
    healthy: config.value.totalPart,
    recovered: 0,
    quarantined: 0,
    infected: 0,
    total: config.value.totalPart,
  };
  particles = [];
  for (let i = 0; i < config.value.totalPart; i++) {
    let isInfected = random(0, 100) <= config.value.infectedProp;
    stats.value.infected += isInfected ? 1 : 0;
    const isFixed = random(0, 100) >= config.value.movingProp;
    const placement = getPlacement(
      particles,
      boundaries.value.maxX,
      boundaries.value.maxY,
      config.value.radiusPart
    );
    // We need at least one infected
    if (i + 1 === config.value.totalPart && stats.value.infected === 0) {
      isInfected = true;
      stats.value.infected += 1;
    }
    const particle = {
      id: i,
      x: placement.x,
      y: placement.y,
      vx: isFixed ? 0 : getVelocity(config.value.maxVelocity),
      vy: isFixed ? 0 : getVelocity(config.value.maxVelocity),
      r: config.value.radiusPart,
      fill: isInfected ? colors.value.initiallyInfected : colors.value.healthy,
      state: isInfected ? config.value.duration : State.HEALTHY,
      mass: isFixed ? FIXED_MASS : MOVING_MASS,
      collidedWith: [],
    };
    particles.push(particle);
  }
}

/**
 * Initialize the canvas sizes.
 */
function initCanvasSizes() {
  particleContext = particlesCanvas.value.getContext('2d');
  boundaries.value.maxX = particlesCanvas.value.parentElement.clientWidth;
  boundaries.value.maxY = particlesCanvas.value.parentElement.clientHeight;
  particlesCanvas.value.width = boundaries.value.maxX;
  particlesCanvas.value.height = boundaries.value.maxY;

  plot.value.context = plotCanvas.value.getContext('2d');
  // Subtract the height of the header and the scrollbar
  plot.value.height = inputsWrapper.value.clientHeight - 38 - 13;
  plotCanvas.value.width = 4000;
  plotCanvas.value.height = plot.value.height;
}

/**
 * Move all particles and update their state in the particle canvas.
 */
function tick() {
  if (!paused.value) {
    clear(particleContext, boundaries.value.maxX, boundaries.value.maxY);
    updateParticles(particles);
    drawParticles(particles, particleContext);

    // Update stats and draw plot
    stats.value.healthy =
      stats.value.total - stats.value.infected - stats.value.recovered;
    if (time.value % plot.value.updateAfterTicks === 0) {
      const time_ = time.value / plot.value.updateAfterTicks;
      // Increase the with of the plot wrapper to show more of the big canvas
      plot.value.width += 1;
      plotScroller.value.scrollLeft += 1;
      // In the plot we do not count quarantined as part of infected particles
      const _stats = Object.assign({}, stats.value);
      _stats.infected -= _stats.quarantined;
      plotStats(
        _stats,
        time_,
        plot.value.context,
        plot.value.height,
        colors.value
      );
    }
    time.value += 1;
  }
  timeoutHandle = setTimeout(tick.bind(this), config.value.tickRate);
}

/**
 * Draw all the particles on the canvas.
 *
 * @param {array} particles The list of all particles
 * @param {CanvasRenderingContext2D} context The canvas context
 */
function drawParticles(particles, context) {
  particles.forEach((particle) => {
    drawCircle(particle.x, particle.y, particle.r, particle.fill, context);
  });
}

/**
 * Clear the canvas
 *
 * @param {CanvasRenderingContext2D} context The canvas context
 * @param {number} width The canvas width
 * @param {number} height The canvas height
 */
function clear(context, width, height) {
  context.clearRect(0, 0, width, height);
}

/**
 * Draw a circle on the canvas.
 *
 * @param {number} x The x coordinate
 * @param {number} y The y coordinate
 * @param {number} r The circle radius
 * @param {string} fill The fill color
 * @param {CanvasRenderingContext2D} context The canvas context
 */
function drawCircle(x, y, r, fill, context) {
  context.fillStyle = fill;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2);
  context.closePath();
  context.fill();
}

function canvasClicked() {
  if (stats.value.infected === 0) {
    reset(true);
  } else {
    paused = !paused;
  }
}

/**
 * On resize callback
 *
 * @param {object} event The resize event
 */
function onResize(event) {
  if (oldWidth !== event.target.innerWidth) {
    setTimeout(reset.bind(this, false), 250);
    oldWidth = event.target.innerWidth;
  }
}

/**
 * Reset the plot and the particles and reinitialize.
 *
 * @param {boolean} restart Force restart flag
 */
function reset(restart) {
  clearTimeout(timeoutHandle);
  clear(plot.value.context, plot.value.width, plot.value.height);
  plot.value.width = 1;
  clear(particleContext, boundaries.value.maxX, boundaries.value.maxY);
  init();
  drawParticles(particles, particleContext);
  paused = restart ? false : paused;
  timeoutHandle = setTimeout(tick.bind(this), config.value.tickRate);
}

/**
 * Update the state of all particles before drawing
 *
 * @param {array} particles The list of all particles
 */
function updateParticles(particles) {
  particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.collidedWith = [];
  });
  particles.forEach((particle) => {
    const collisions = getCollisions(particles, particle);
    // Filter particles which were processed in previous iterations
    collisions
      .filter((p) => !p.collidedWith.includes(particle))
      .forEach((p) => {
        // Process the collision of a unique pair
        updateVelocities(particle, p);
        particle.collidedWith.push(p);
      });
    processWallCollision(particle, boundaries.value);
    infectParticle(particle, collisions, config.value.infectionProb);
    recoverParticle(particle);
    quarantineParticle(particle, config.value.quarantineProb);
  });
}

/**
 * Recover particle after a certain duration.
 *
 * @param {object} particle The particle to update
 */
function recoverParticle(particle) {
  if (particle.state > State.HEALTHY) {
    particle.state -= 1;
    if (particle.state === State.HEALTHY) {
      if (particle.fill === colors.value.quarantined) {
        stats.value.quarantined -= 1;
      }
      // Particle has recovered from infection
      particle.state = State.RECOVERED;
      particle.fill = colors.value.recovered;
      stats.value.recovered += 1;
      stats.value.infected -= 1;
      if (stats.value.infected === 0) {
        paused = true;
      }
    }
  }
}

/**
 * Set a particle to a fixed position after a certain duration.
 *
 * @param {object} particle The particle to update
 * @param {number} probability The quarantine probability
 */
function quarantineParticle(particle, probability) {
  if (
    particle.state > State.HEALTHY &&
    particle.state < config.value.duration - config.value.quarantineAfter &&
    particle.fill !== colors.value.quarantined &&
    random(0, 100) <= probability
  ) {
    // Particle got quarantined
    particle.mass = FIXED_MASS;
    particle.fill = colors.value.quarantined;
    particle.vx = 0;
    particle.vy = 0;
    stats.value.quarantined += 1;
  }
}

/**
 * Infect the particle if the particle collides with infected particles.
 *
 * @param {object} particle The particle to update
 * @param {array} collisions The particles which currently collide with particle
 * @param {number} probability The infection probability
 */
function infectParticle(particle, collisions, probability) {
  if (
    particle.state === State.HEALTHY &&
    collisions.filter((p) => p.state > State.HEALTHY).length &&
    random(0, 100) <= probability
  ) {
    // Particle got infected
    particle.state = config.value.duration;
    particle.fill = colors.value.infected;
    stats.value.infected += 1;
  }
}

/**
 * Update the velocities of the two colliding particles
 * based on https://en.wikipedia.org/wiki/Elastic_collision
 * with angle-free representation in 2D.
 *
 * @param {{x: number, y: number, mass: number, vx: number, vy: number}} particle1 Particle 1
 * @param {{x: number, y: number, mass: number, vx: number, vy: number}} particle2 Particle 2
 */
function updateVelocities(particle1, particle2) {
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
    const mass1 = (2 * particle2.mass) / massSum;
    const mass2 = (2 * particle1.mass) / massSum;
    // Update the velocities
    particle1.vx += mass1 * xCollision;
    particle1.vy += mass1 * yCollision;
    particle2.vx -= mass2 * xCollision;
    particle2.vy -= mass2 * yCollision;
  }
}

/**
 * Return the list of all particles colliding with particle.
 * The 2-norm is used to determine if two particles overlap.
 *
 * @param {[{x: number, y: number, r: number, id: number, collidedWith: array}]} particles The list of all particles
 * @param {{x: number, y: number, r: number, id: number}} particle The particle to check for collisions with other particles
 * @return {array} The list of particles colliding with particle
 */
function getCollisions(particles, particle) {
  return particles.filter((p) => {
    const xDiff = p.x - particle.x;
    const yDiff = p.y - particle.y;
    return (
      p.id !== particle.id && xDiff * xDiff + yDiff * yDiff <= 4 * p.r * p.r
    );
  });
}

/**
 * Update the particle position and velocity if the x or y position is near a wall.
 *
 * @param {{x: number, y: number, r: number, vx: number, vy: number}} particle The particle to check and update if necessary
 * @param {{minX: number, maxX: number, minY: number, maxY: number}} boundaries The boundaries of the canvas
 */
function processWallCollision(particle, boundaries) {
  const { r } = particle;
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
}

/**
 * Get a random number between from and to.
 *
 * @param {number} from Minimum
 * @param {number} to Maximum
 * @return {number} The random number
 */
function random(from, to) {
  return Math.round(Math.random() * (to - from) + from);
}

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
function getPlacement(particles, maxX, maxY, radius) {
  const x = random(radius + 1, maxX - radius - 1);
  const y = random(radius + 1, maxY - radius - 1);
  if (getCollisions(particles, { x, y, r: radius, id: -1 }).length) {
    // Compute another location because the particle overlaps with another particle
    return getPlacement(particles, maxX, maxY, radius);
  }
  return { x, y };
}

/**
 * Get a random velocity which is not 0.
 *
 * @param {number} maxVelocity The maximal velocity
 * @return {number} The random velocity
 */
function getVelocity(maxVelocity) {
  const velocity = random(-maxVelocity, maxVelocity);
  return velocity === 0 ? getVelocity(maxVelocity) : velocity;
}

/**
 * Plot the number of healthy, infected and recovered particles in the canvas context.
 *
 * @param {object} stats The infection statistics
 * @param {number} time The current time or x value
 * @param {CanvasRenderingContext2D} context The canvas context
 * @param {number} height Height of the canvas
 * @param {object} colors The colors used for healthy, infected and recovered particles
 */
function plotStats(stats, time, context, height, colors) {
  let y = height;
  const plot = (prop) => {
    const scaled = (stats[prop] / stats.total) * height;
    y -= scaled;
    context.fillStyle = colors[prop];
    context.fillRect(time, y, 1, scaled);
  };
  plot('healthy');
  plot('recovered');
  plot('quarantined');
  plot('infected');
}
</script>

<style scoped lang="scss">
@import '../colors';

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

.inputs-wrapper,
.counts-wrapper {
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
