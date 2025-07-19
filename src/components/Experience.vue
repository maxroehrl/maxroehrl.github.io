<template>
  <div class="cv-container max-w-4xl mx-auto p-6 bg-white">
    <!-- Work Experience Section -->
    <section class="mb-12">
      <h2
        class="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-500 pb-2">
        Berufserfahrung
      </h2>

      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

        <div class="space-y-8">
          <!-- One Data - Current Position -->
          <div class="relative pl-12">
            <div
              class="absolute left-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow"></div>
            <div class="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div
                class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div class="flex-1">
                  <h3 class="text-xl font-semibold text-gray-800">One Data</h3>
                  <p class="text-sm text-gray-600 mt-1">
                    6 Jahre 3 Monate • Hybrid
                  </p>
                </div>
              </div>

              <!-- Current Role -->
              <div class="mb-4 pb-4 border-b border-gray-200">
                <h4 class="text-lg font-medium text-blue-600">
                  Software Developer
                </h4>
                <p class="text-sm text-gray-600">Vollzeit</p>
                <p class="text-sm text-gray-500 mt-1">
                  Okt. 2022–Heute · 2 Jahre 10 Monate
                </p>
                <p class="text-sm text-gray-500">
                  Stadt Passau, Bavaria, Germany
                </p>
              </div>

              <!-- Previous Role -->
              <div>
                <h4 class="text-lg font-medium text-blue-600">
                  Working Student
                </h4>
                <p class="text-sm text-gray-600">Werkstudium</p>
                <p class="text-sm text-gray-500 mt-1">
                  Mai 2019–Nov. 2022 · 3 Jahre 7 Monate
                </p>
                <p class="text-sm text-gray-500">Passau, Bavaria, Germany</p>
              </div>
            </div>
          </div>

          <!-- T.CON Position -->
          <div class="relative pl-12">
            <div
              class="absolute left-2 w-4 h-4 bg-blue-400 rounded-full border-4 border-white shadow"></div>
            <div class="bg-gray-50 rounded-lg p-6 shadow-sm">
              <h3 class="text-xl font-semibold text-gray-800">
                T.CON GmbH & Co. KG
              </h3>
              <h4 class="text-lg font-medium text-blue-600 mt-2">
                Working Student
              </h4>
              <p class="text-sm text-gray-600">Werkstudium</p>
              <p class="text-sm text-gray-500 mt-1">
                Feb. 2018–Sept. 2018 · 8 Monate
              </p>
              <p class="text-sm text-gray-500">
                Plattling, Bavaria, Germany · Vor Ort
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section>
      <h2
        class="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-green-500 pb-2">
        Ausbildung
      </h2>

      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

        <div class="space-y-8">
          <!-- Master's Degree -->
          <div class="relative pl-12">
            <div
              class="absolute left-2 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow"></div>
            <div class="bg-gray-50 rounded-lg p-6 shadow-sm">
              <h3 class="text-xl font-semibold text-gray-800">
                Universität Passau
              </h3>
              <h4 class="text-lg font-medium text-green-600 mt-2">
                Master of Science - MS, Computer Science
              </h4>
              <p class="text-sm text-gray-500 mt-1">2019–2022</p>
            </div>
          </div>

          <!-- Bachelor's Degree -->
          <div class="relative pl-12">
            <div
              class="absolute left-2 w-4 h-4 bg-green-400 rounded-full border-4 border-white shadow"></div>
            <div class="bg-gray-50 rounded-lg p-6 shadow-sm">
              <h3 class="text-xl font-semibold text-gray-800">
                Universität Passau
              </h3>
              <h4 class="text-lg font-medium text-green-600 mt-2">
                Bachelor's degree, Computer Science
              </h4>
              <p class="text-sm text-gray-500 mt-1">2015–2019</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// No reactive data needed for this static CV display
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 768px) {
  .cv-container {
    padding: 1rem;
  }

  .relative.pl-12 {
    padding-left: 2rem;
  }

  .absolute.left-2 {
    left: 0.25rem;
  }

  .absolute.left-4 {
    left: 0.25rem;
  }
}
</style>
