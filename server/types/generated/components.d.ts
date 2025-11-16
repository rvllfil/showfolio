import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalPortfolioNumber extends Struct.ComponentSchema {
  collectionName: 'components_global_portfolio_numbers';
  info: {
    displayName: 'Portfolio Number';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface GlobalSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_global_social_links';
  info: {
    displayName: 'Social Links';
  };
  attributes: {
    iconKey: Schema.Attribute.String;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface GlobalTechTags extends Struct.ComponentSchema {
  collectionName: 'components_global_tech_tags';
  info: {
    displayName: 'Tech Tags';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['frontend', 'backend', 'cms', 'ecommerce', 'tool']
    >;
    name: Schema.Attribute.String;
    slug: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global.portfolio-number': GlobalPortfolioNumber;
      'global.social-links': GlobalSocialLinks;
      'global.tech-tags': GlobalTechTags;
    }
  }
}
