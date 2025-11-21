<template>
  <div class="bg-gray-200 py-16 lg:py-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-12">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Start exchanging skills in just a few simple steps. No money required, just your talent and willingness to collaborate.
        </p>
      </div>

      <!-- Steps -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Step 1 -->
        <div class="relative">
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 hidden lg:block" style="transform: translateX(50%); width: calc(100% - 4rem);"></div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">1. Create Your Profile</h3>
            <p class="text-gray-600">
              Sign up and showcase your skills, expertise, and what you're looking to learn or get help with.
            </p>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="relative">
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div class="absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 hidden lg:block" style="transform: translateX(50%); width: calc(100% - 4rem);"></div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">2. Browse & Explore</h3>
            <p class="text-gray-600">
              Discover projects and requests from other creatives. Find opportunities that match your skills.
            </p>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="relative">
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div class="absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 hidden lg:block" style="transform: translateX(50%); width: calc(100% - 4rem);"></div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">3. Connect & Negotiate</h3>
            <p class="text-gray-600">
              Reach out to potential partners, discuss the details, and agree on the skill exchange terms.
            </p>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="relative">
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">4. Collaborate & Grow</h3>
            <p class="text-gray-600">
              Exchange your skills, complete projects together, and build your portfolio while helping others.
            </p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-16">
        <a href="#" class="inline-block rounded-full bg-black px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition">
          Get Started Now
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HowItWorks'
}
</script>
