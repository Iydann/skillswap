<template>
<nav class="relative z-[100] bg-white border-b border-gray-200">
  <div class="px-6 lg:px-12">
    <div class="flex h-16 items-center">
      <!-- Logo -->
      <div class="flex items-center">
        <router-link to="/" class="flex items-center space-x-2">
          <img src="../assets/company_clear.png" alt="SkillSwap" class="h-8 w-auto" />
          <span class="text-xl font-semibold text-gray-900">SkillSwap</span>
        </router-link>
      </div>

      <!-- Center Navigation -->
      <div class="hidden md:flex items-center space-x-8 flex-1 justify-center">
        <router-link to="/explore" class="text-sm font-medium text-gray-700 hover:text-gray-900">Explore</router-link>
        <router-link to="/message" class="text-sm font-medium text-gray-700 hover:text-gray-900">Message</router-link>
        <router-link to="/task" class="text-sm font-medium text-gray-700 hover:text-gray-900">Task</router-link>
        <router-link to="/create-offer" class="text-sm font-medium text-gray-700 hover:text-gray-900">Create Offer</router-link>
        <router-link to="/about" class="text-sm font-medium text-gray-700 hover:text-gray-900">About</router-link>
      </div>

      <!-- Right: Auth Buttons -->
      <div class="hidden md:flex items-center space-x-4">
        <router-link to="/signup" class="text-sm font-medium text-gray-700 hover:text-gray-900">Sign up</router-link>
        <router-link to="/login" class="rounded-full bg-black px-6 py-2 text-sm font-medium text-white hover:bg-gray-800">Log in</router-link>
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
        <router-link to="/signup" class="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">Sign up</router-link>
        <router-link to="/login" class="block w-full rounded-md bg-black px-3 py-2 text-base font-medium text-white hover:bg-gray-800">Log in</router-link>
      </div>
    </div>
  </el-disclosure>
</nav>
</template>