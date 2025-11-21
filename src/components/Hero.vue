<template>
<div class="bg-gray-200">
  <div class="px-6 lg:px-12 pt-16 pb-16 w-full">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div class="space-y-8">
          <div>
            <h1 class="text-4xl lg:text-5xl font-bold text-black mb-4">
              Exchange Jobs or Skills, not Money
            </h1>
            <p class="text-lg text-black font-medium">
              SkillSwap | Find Your Creative Partner.
            </p>
          </div>

          <!-- Quote -->
          <div class="relative">
            <svg class="absolute -left-2 -top-2 h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p class="text-base text-gray-700 pl-8 pr-8">
              Welcome to a community of creators and freelancers. Here, your skills are the currency you use to bring your ideas to life.
            </p>
            <svg class="absolute -right-2 bottom-0 h-8 w-8 text-gray-400 rotate-180" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
          </div>

          <!-- Search Input -->
          <div class="relative max-w-lg">
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Explore" 
              class="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        <!-- Right Image -->
        <div class="flex justify-center lg:justify-end">
          <img 
            src="../assets/hero.png" 
            alt="SkillSwap Community" 
            class="rounded-2xl shadow-lg w-full max-w-xl object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</div>
</template>