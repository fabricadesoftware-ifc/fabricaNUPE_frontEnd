export default {
  mode: process.env.NUXT_MODE,
  head: {
    title: "NuPe - Fábrica de Software",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "NuPe - Fábrica de Software",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      {
        href: "https://fonts.googleapis.com/css2?family=Nunito&display=swap",
        rel: "stylesheet",
      },
    ],
    htmlAttrs: {
      class: [
        "has-aside-left",
        "has-aside-mobile-transition",
        "has-navbar-fixed-top",
        "has-aside-expanded",
      ],
    },
  },

  loading: { color: "#fff" },
  css: ["~/assets/scss/main.scss", "@mdi/font/css/materialdesignicons.css"],
  styleResources: { scss: ["~/assets/scss/main.scss"] },

  plugins: [],
  buildModules: [],
  modules: [
    "@nuxtjs/style-resources",
    "@nuxtjs/toast",
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    ["nuxt-buefy", { css: false, materialDesignIcons: true }],
  ],

  auth: {
    localStorage: false,
    cookie: {
      options: {
        secure: process.env.NODE_ENV === "production",
      },
    },

    strategies: {
      customStrategy: {
        _scheme: "~/plugins/schemes/customAuthScheme",
        client_id: "qp6apa6bdVMgORB61EZWS1nmy4CmZLpGHgMRHMvT", // deve manter sempre atualizado
        client_secret:
          "Ho1JdNf9BTkuxSQ5Z8TuTfmictX4OKYcluxei6tXELNtyhSc0lXrxKEoogz0MvuuUeBcQ6yoB0NnwH3Hey7Py45h9REP3okgT85Vgli80EY4z843je31kGBfk9HsTVxn", // deve manter sempre atualizado
        token: {
          property: "access",
        },
        refreshToken: {
          property: "refresh",
          data: "refresh",
          maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: "user",
        },
        endpoints: {
          login: {
            url: "/oauth/token/",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            method: "post",
            propertyName: "access_token",
            altProperty: "refresh_token",
          },
          refresh: {
            url: "/api/v1/refresh_token/",
            method: "post",
            //   propertyName: ''
          },
          logout: {},
          user: {
            url: "/api/v1/account/current/",
            method: "get",
            propertyName: false,
          },
        },
      },
    },
    resetOnError: true,
    redirect: {
      login: "/login",
      logout: "/login",
    },
  },

  router: {
    middleware: ["auth"],
  },

  axios: {
    baseURL: 'http://localhost:8000', // não alterar em modo de desenvolvimento
    // withCredentials: true,
    // crossdomain: true
  },

  toast: {
    position: "top-center",
    iconPack: "fontawesome",
    duration: 3000,
    register: [
      // Register custom toasts
      {
        name: "defaultSuccess",
        message: "Operação realizada com sucesso",
        options: {
          type: "success",
          icon: "check",
        },
      },
      {
        name: "defaultError",
        message: (yload) =>
          !payload.msg ? "Oops.. Erro inesperado" : payload.msg,
        options: {
          type: "error",
          icon: "times",
        },
      },
    ],
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extractCSS: true,
    transpile: ["@nuxtjs/auth"],
    extend(config, ctx) { },
  },
};
