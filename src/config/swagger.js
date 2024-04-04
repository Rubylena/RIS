const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "RIS API",
      description: "RIS API Information",
      contact: {
        name: "Grace Effiong",
        email: "graceffiong@gmail.com",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8000/api/v1",
        description: "Development server",
      },
      {
        url: "https://ris-ej9d.onrender.com/api/v1",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/v1/*.js"],
};

export default swaggerOptions;
