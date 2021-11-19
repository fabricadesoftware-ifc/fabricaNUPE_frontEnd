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
        client_id: "ypdW8UdQcFh1ri2Qd6PQJ4XtxyXnF3WL9yGpwr7p", // deve manter sempre atualizado
        client_secret:
          "hU9RnilF9zeJTAWznN4nZQPOORrQ9CCczmPpSFWIaGt3PX1lxB080Ai2yoomFuGyzQ4OHx7gJrfxYtZFdG8Lkr5SIowT8mE96jsuSZ7GhHBVw0KZaJNwuvsUW33k7APF", // deve manter sempre atualizado
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

