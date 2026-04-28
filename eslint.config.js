export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        performance: 'readonly',
        requestAnimationFrame: 'readonly',
        setInterval: 'readonly',
        setTimeout: 'readonly',
        console: 'readonly',
        speechSynthesis: 'readonly',
        SpeechSynthesisUtterance: 'readonly',
        AudioContext: 'readonly',
        webkitAudioContext: 'readonly',
        gsap: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-var': 'error',
      'prefer-const': 'warn'
    }
  }
];
