<template>
  <div class="cv-container max-w-4xl mx-auto p-6">
    <!-- Work Experience Section -->
    <section class="mb-12">
      <h2
        class="text-3xl font-bold text-accent-dark mb-8 border-b-2 border-accent pb-2">
        Job Experience
      </h2>

      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-text"></div>

        <div class="space-y-8">
          <!-- One Data - Current Position -->
          <div class="relative pl-12">
            <div
              class="absolute left-2.5 w-4 h-4 bg-accent rounded-full border-4 border-text shadow"></div>
            <div
              class="bg-surface-card rounded-lg p-6 shadow-sm hover:translate-x-2">
              <div
                class="flex flex-col md:flex-row md:items-start md:justify-between">
                <div class="flex-1">
                  <h3 class="text-xl font-semibold text-text">One Data</h3>
                </div>
              </div>

              <!-- Current Role -->
              <div class="mb-4 pb-4 border-b border-gray-200">
                <h4 class="text-lg font-medium text-accent">
                  Software Developer
                </h4>
                <p class="text-sm text-text">Full Time</p>
                <p class="text-sm text-text mt-1">Oct. 2022–Today</p>
                <p class="text-sm text-text">Passau, Bavaria, Germany</p>
              </div>

              <!-- Previous Role -->
              <div>
                <h4 class="text-lg font-medium text-accent">Working Student</h4>
                <p class="text-sm text-text">
                  Working Student times during the semster
                </p>
                <p class="text-sm text-text mt-1">
                  May 2019–Nov. 2022 · 3 Years 7 Months
                </p>
                <p class="text-sm text-text">Passau, Bavaria, Germany</p>
              </div>
            </div>
          </div>

          <!-- T.CON Position -->
          <div class="relative pl-12">
            <div
              class="absolute left-2.5 w-4 h-4 bg-accent rounded-full border-4 border-text shadow"></div>
            <div
              class="bg-surface-card rounded-lg p-6 shadow-sm hover:translate-x-2">
              <h3 class="text-xl font-semibold text-accent-text">
                T.CON GmbH & Co. KG
              </h3>
              <h4 class="text-lg font-medium text-accent mt-2">
                Working Student
              </h4>
              <p class="text-sm text-text">
                Working Student times during the semster
              </p>
              <p class="text-sm text-text mt-1">
                Feb. 2018–Sep. 2018 · 8 Months
              </p>
              <p class="text-sm text-text">Plattling, Bavaria, Germany</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section>
      <h2
        class="text-3xl font-bold text-accent-dark mb-8 border-b-2 border-accent pb-2">
        Education
      </h2>

      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-text"></div>

        <div class="space-y-8">
          <!-- Master's Degree -->
          <div class="relative pl-12">
            <div
              class="absolute left-2.5 w-4 h-4 bg-accent rounded-full border-4 border-text shadow"></div>
            <div
              class="bg-surface-card rounded-lg p-6 shadow-sm hover:translate-x-2">
              <h3 class="text-xl font-semibold text-text">
                University of Passau
              </h3>
              <h4 class="text-lg font-medium text-accent mt-2">
                Master of Science - MS, Computer Science
              </h4>
              <p class="text-sm text-text mt-1">2019–2022</p>
            </div>
          </div>

          <!-- Bachelor's Degree -->
          <div class="relative pl-12">
            <div
              class="absolute left-2.5 w-4 h-4 bg-accent rounded-full border-4 border-text shadow"></div>
            <div
              class="bg-surface-card rounded-lg p-6 shadow-sm hover:translate-x-2">
              <h3 class="text-xl font-semibold text-text">
                University of Passau
              </h3>
              <h4 class="text-lg font-medium text-accent mt-2">
                Bachelor's degree, Computer Science
              </h4>
              <p class="text-sm text-text mt-1">2015–2019</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.bg-surface-card {
  transition: all 0.6s ease;
}

.bg-surface-card:hover {
  box-shadow:
    0 0 2px var(--color-shadow),
    0 8px 24px 0 var(--color-shadow-2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .cv-container {
    padding: 1rem;
  }

  .relative.pl-12 {
    padding-left: 2rem;
  }

  .absolute.w-4 {
    left: -0.1rem;
  }

  .absolute.left-4 {
    left: 0.25rem;
  }
}
</style>
