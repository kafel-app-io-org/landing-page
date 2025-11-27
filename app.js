/**
 * Kafel Landing Page JavaScript
 * Handles theme toggling, mobile menu, language switching, and internationalization
 * Vanilla JavaScript with accessibility support and RTL compatibility
 */

class KafelApp {
  constructor() {
    this.currentLanguage = "en"
    this.currentTheme = "dark"
    this.translations = {}

    this.init()
  }

  async init() {
    // Load translations
    // await this.loadTranslations()

    // Initialize components
    this.initThemeToggle()
    this.initLanguageSelector()
    this.initMobileMenu()
    this.initSmoothScrolling()

    // Load saved preferences
    this.loadPreferences()

    // Apply initial language and theme
    this.applyLanguage(this.currentLanguage)
    this.applyTheme(this.currentTheme)

    console.log("[v0] Kafel app initialized successfully")
  }

  async loadTranslations() {
    try {
      const [enResponse, arResponse] = await Promise.all([fetch("i18n/en.json"), fetch("i18n/ar.json")])

      this.translations.en = await enResponse.json()
      this.translations.ar = await arResponse.json()

      console.log("[v0] Translations loaded successfully")
    } catch (error) {
      console.error("[v0] Failed to load translations:", error)
      // Fallback translations
      this.translations = {
        en: { "hero-title": "Your Decentralized Wallet for Seamless Transfers & Givin" },
        ar: { "hero-title": "محفظتك اللامركزية لتحويلات وعطاء  بسلاسة" },
      }
    }
  }

  initThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle")
    if (!themeToggle) return

    themeToggle.addEventListener("click", () => {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light"
      this.applyTheme(this.currentTheme)
      this.savePreferences()
    })

    // Keyboard support
    themeToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        themeToggle.click()
      }
    })
  }

  initLanguageSelector() {
    const languageSelect = document.getElementById("language-select")
    if (!languageSelect) return

    languageSelect.addEventListener("change", (e) => {
      const newLanguage = e.target.value
      this.currentLanguage = newLanguage
      this.applyLanguage(newLanguage)
      this.savePreferences()
    })
  }

  initMobileMenu() {
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
    const nav = document.querySelector(".nav")

    if (!mobileMenuToggle || !nav) return

    mobileMenuToggle.addEventListener("click", () => {
      const isExpanded = mobileMenuToggle.getAttribute("aria-expanded") === "true"

      mobileMenuToggle.setAttribute("aria-expanded", !isExpanded)
      nav.classList.toggle("nav--open", !isExpanded)

      // Toggle hamburger animation
      mobileMenuToggle.classList.toggle("mobile-menu-toggle--active", !isExpanded)
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenuToggle.contains(e.target) && !nav.contains(e.target)) {
        mobileMenuToggle.setAttribute("aria-expanded", "false")
        nav.classList.remove("nav--open")
        mobileMenuToggle.classList.remove("mobile-menu-toggle--active")
      }
    })

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        mobileMenuToggle.setAttribute("aria-expanded", "false")
        nav.classList.remove("nav--open")
        mobileMenuToggle.classList.remove("mobile-menu-toggle--active")
      }
    })
  }

  initSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))

        if (target) {
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = target.offsetTop - headerHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  }

  applyTheme(theme) {
    const themeToggle = document.getElementById("theme-toggle")

    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      themeToggle?.setAttribute("aria-pressed", "true")
    } else {
      document.documentElement.classList.remove("dark")
      themeToggle?.setAttribute("aria-pressed", "false")
    }

    console.log(`[v0] Applied ${theme} theme`)
  }

  applyLanguage(language) {
    const html = document.documentElement
    const languageSelect = document.getElementById("language-select")

    // Set language and direction
    html.setAttribute("lang", language)
    html.setAttribute("dir", language === "ar" ? "rtl" : "ltr")

    // Update language selector
    if (languageSelect) {
      languageSelect.value = language
    }

    // Update all translatable elements
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n")
      const translation = this.translations[language]?.[key]

      if (translation) {
        element.textContent = translation
      }
    })

    console.log(`[v0] Applied ${language} language`)
  }

  savePreferences() {
    const preferences = {
      language: this.currentLanguage,
      theme: this.currentTheme,
    }

    try {
      localStorage.setItem("kafel-preferences", JSON.stringify(preferences))
      console.log("[v0] Preferences saved to localStorage")
    } catch (error) {
      console.error("[v0] Failed to save preferences:", error)
    }
  }

  loadPreferences() {
    try {
      const saved = localStorage.getItem("kafel-preferences")
      if (saved) {
        const preferences = JSON.parse(saved)
        this.currentLanguage = preferences.language || "en"
        this.currentTheme = preferences.theme || "light"
        console.log("[v0] Preferences loaded from localStorage")
      }
    } catch (error) {
      console.error("[v0] Failed to load preferences:", error)
    }
  }

  // Utility method for form validation (if needed)
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Utility method for accessible announcements
  announceToScreenReader(message) {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = message

    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new KafelApp()
})

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    console.log("[v0] Page became visible")
  }
})
