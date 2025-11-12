import { properties } from "~/data/properties";

interface SuggestedRoute {
  title: string;
  uri: string;
}

interface RouteDescription {
  suggestedRoutes: SuggestedRoute[];
  itemTitle: string;
}

export function getRouteDescription(): RouteDescription {
  return {
    suggestedRoutes: properties.map((property) => ({
      title: property.title,
      uri: `/property/${property.id}`,
    })),
    itemTitle: "Property Detail",
  };
}
