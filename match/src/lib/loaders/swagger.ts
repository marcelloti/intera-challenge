import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { Application } from "express";
import * as swaggerUiExpress from "swagger-ui-express";

import { defaultMetadataStorage } from "class-transformer/storage";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import controllersDeclaration from "@src/controller/declaration";

const swaggerLoader = async (app: Application): Promise<Application> => {
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: "#/components/schemas/"
  });

  const storage = getMetadataArgsStorage();
  const routingControllersOptions = {
    controllers: controllersDeclaration,
    routePrefix: "/api"
  };
  const spec = routingControllersToSpec(storage, routingControllersOptions, {
    components: {
      schemas,
      securitySchemes: {
        basicAuth: {
          scheme: "basic",
          type: "http"
        }
      }
    },
    info: {
      description: "Generated with `routing-controllers-openapi`",
      title: "Intera API",
      version: "1.0.0"
    }
  });

  app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

  return app;
};

export { swaggerLoader };
