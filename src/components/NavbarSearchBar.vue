<template>
<nav class="relative z-[100] bg-white border-b border-gray-200">
  <div class="px-6 lg:px-12">
    <div class="flex h-16 items-center">
      <!-- Logo -->
      <div class="flex items-center flex-shrink-0">
        <router-link to="/" class="flex items-center space-x-2">
          <img src="../assets/company_clear.png" alt="SkillSwap" class="h-8 w-auto" />
          <span class="text-xl font-semibold text-gray-900">SkillSwap</span>
        </router-link>
      </div>

      <!-- Search Bar -->
      <div class="hidden md:flex flex-shrink-0 w-80 ml-36">
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="What are you looking for?" 
            class="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>

      <!-- Center Navigation -->
      <div class="hidden md:flex items-center space-x-8 ml-8">
        <router-link to="/explore" class="text-sm font-medium text-gray-900 hover:text-gray-700">Explore</router-link>
        <router-link to="/message" class="text-sm font-medium text-gray-700 hover:text-gray-900">Message</router-link>
        <router-link to="/task" class="text-sm font-medium text-gray-700 hover:text-gray-900">Task</router-link>
        <router-link to="/create-offer" class="text-sm font-medium text-gray-700 hover:text-gray-900">Create Offer</router-link>
        <router-link to="/about" class="text-sm font-medium text-gray-700 hover:text-gray-900">About</router-link>
      </div>

      <!-- Spacer to push buttons right -->
      <div class="flex-1"></div>

      <!-- Right: Auth Buttons -->
      <div class="hidden md:flex items-center space-x-4 flex-shrink-0">
        <button class="text-sm font-medium text-gray-700 hover:text-gray-900">Sign up</button>
        <button class="rounded-full bg-black px-6 py-2 text-sm font-medium text-white hover:bg-gray-800">Log in</button>
      </div>

      <!-- Mobile menu button -->
      <div class="flex md:hidden">
        <button type="button" command="--toggle" commandfor="mobile-menu" class="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <span class="sr-only">Open main menu</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6 in-aria-expanded:hidden">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6 not-in-aria-expanded:hidden">
            <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  <el-disclosure id="mobile-menu" hidden class="md:hidden border-t border-gray-200">
    <div class="space-y-1 px-4 pt-2 pb-3">
      <router-link to="/explore" class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">Explore</router-link>
      <router-link to="/message" class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">Message</router-link>
      <router-link to="/task" class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">Task</router-link>
      <router-link to="/create-offer" class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">Create Offer</router-link>
      <router-link to="/about" class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">About</router-link>
      <div class="border-t border-gray-200 pt-2 mt-2 space-y-2">
        <button class="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">Sign up</button>
        <button class="block w-full rounded-md bg-black px-3 py-2 text-base font-medium text-white hover:bg-gray-800">Log in</button>
      </div>
    </div>
  </el-disclosure>
</nav>
</template>