// =============================================
// Mock Data for Lineage Graph with Column Lineage
// =============================================

// Column/Feature type icons (for reference in rendering)
const COLUMN_TYPES = {
  VARCHAR: 'string',
  TEXT: 'string',
  STRING: 'string',
  INTEGER: 'number',
  INT: 'number',
  BIGINT: 'number',
  NUMBER: 'number',
  DECIMAL: 'number',
  FLOAT: 'number',
  DOUBLE: 'number',
  BOOLEAN: 'boolean',
  BOOL: 'boolean',
  DATE: 'date',
  TIMESTAMP: 'timestamp',
  DATETIME: 'timestamp',
  JSON: 'json',
  OBJECT: 'json',
  ARRAY: 'array',
  VARIANT: 'variant',
};

// =============================================
// Object Type Enum
// =============================================
const OBJ_TYPES = {
  TABLE: 'TABLE',
  VIEW: 'VIEW',
  DATASET: 'DATASET',
  MODEL: 'MODEL',
  DASHBOARD: 'DASHBOARD',
  API: 'API',
  STAGE: 'STAGE',
  EXTERNAL: 'EXTERNAL',
};

// =============================================
// Main Lineage Data Structure
// =============================================
const mockLineageData = {
  depths: [
    // =========================================
    // DEPTH -3: External APIs (Upstream)
    // =========================================
    {
      id: 'depth-1',
      level: -3,
      label: 'Upstream −3',
      type: 'upstream',
      groups: [
        {
          id: 'external-apis',
          name: 'External APIs',
          icon: './img/api.svg',
          type: 'platform',
          items: [
            {
              id: 'shopify-api',
              name: 'Shopify Orders API',
              objType: OBJ_TYPES.API,
              icon: './img/api.svg',
              downstream: ['orders'],
              // APIs typically expose fields/endpoints
              columns: [
                { name: 'order_id', type: 'STRING' },
                { name: 'customer_id', type: 'STRING' },
                { name: 'order_date', type: 'TIMESTAMP' },
                { name: 'total_amount', type: 'DECIMAL' },
                { name: 'currency', type: 'STRING' },
                { name: 'status', type: 'STRING' },
                { name: 'line_items', type: 'ARRAY' },
                { name: 'shipping_address', type: 'JSON' },
              ]
            },
            {
              id: 'stripe-api',
              name: 'Stripe Payments API',
              objType: OBJ_TYPES.API,
              icon: './img/api.svg',
              downstream: ['payments'],
              columns: [
                { name: 'payment_id', type: 'STRING' },
                { name: 'charge_id', type: 'STRING' },
                { name: 'amount', type: 'INTEGER' },
                { name: 'currency', type: 'STRING' },
                { name: 'customer_id', type: 'STRING' },
                { name: 'payment_method', type: 'STRING' },
                { name: 'status', type: 'STRING' },
                { name: 'created_at', type: 'TIMESTAMP' },
              ]
            },
            {
              id: 'salesforce-api',
              name: 'Salesforce CRM',
              objType: OBJ_TYPES.API,
              icon: './img/api.svg',
              downstream: ['customers'],
              columns: [
                { name: 'account_id', type: 'STRING' },
                { name: 'contact_id', type: 'STRING' },
                { name: 'email', type: 'STRING' },
                { name: 'first_name', type: 'STRING' },
                { name: 'last_name', type: 'STRING' },
                { name: 'company', type: 'STRING' },
                { name: 'phone', type: 'STRING' },
                { name: 'created_date', type: 'TIMESTAMP' },
              ]
            },
            {
              id: 'ga4-api',
              name: 'Google Analytics 4',
              objType: OBJ_TYPES.API,
              icon: './img/api.svg',
              downstream: ['ga_sessions', 'ga_events'],
              columns: [
                { name: 'client_id', type: 'STRING' },
                { name: 'session_id', type: 'STRING' },
                { name: 'user_id', type: 'STRING' },
                { name: 'event_name', type: 'STRING' },
                { name: 'event_timestamp', type: 'TIMESTAMP' },
                { name: 'page_location', type: 'STRING' },
                { name: 'page_referrer', type: 'STRING' },
                { name: 'device_category', type: 'STRING' },
                { name: 'geo_country', type: 'STRING' },
              ]
            },
            {
              id: 'fb-ads-api',
              name: 'Facebook Ads API',
              objType: OBJ_TYPES.API,
              icon: './img/api.svg',
              downstream: ['ad_spend'],
              columns: [
                { name: 'ad_id', type: 'STRING' },
                { name: 'campaign_id', type: 'STRING' },
                { name: 'adset_id', type: 'STRING' },
                { name: 'spend', type: 'DECIMAL' },
                { name: 'impressions', type: 'INTEGER' },
                { name: 'clicks', type: 'INTEGER' },
                { name: 'conversions', type: 'INTEGER' },
                { name: 'date', type: 'DATE' },
              ]
            },
            {
              id: 'mixpanel-api',
              name: 'Mixpanel Events',
              objType: OBJ_TYPES.API,
              icon: './img/api.svg',
              downstream: ['product_events'],
              columns: [
                { name: 'distinct_id', type: 'STRING' },
                { name: 'event', type: 'STRING' },
                { name: 'time', type: 'TIMESTAMP' },
                { name: 'properties', type: 'JSON' },
                { name: 'insert_id', type: 'STRING' },
              ]
            },
          ]
        }
      ]
    },

    // =========================================
    // DEPTH -2: Raw Tables (Landing Zone)
    // =========================================
    {
      id: 'depth-2',
      level: -2,
      label: 'Upstream −2',
      type: 'upstream',
      groups: [
        {
          id: 'acme-raw-db',
          database: 'ACME_PROD',
          icon: './img/logo-snowflake.svg',
          type: 'database',
          schemas: [
            {
              id: 'raw-ecommerce',
              name: 'RAW_ECOMMERCE',
              items: [
                {
                  id: 'orders',
                  name: 'ORDERS',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['stg_orders'],
                  columns: [
                    { name: 'ORDER_ID', type: 'VARCHAR', isPrimaryKey: true },
                    { name: 'CUSTOMER_ID', type: 'VARCHAR', isForeignKey: true },
                    { name: 'ORDER_DATE', type: 'TIMESTAMP' },
                    { name: 'TOTAL_AMOUNT', type: 'DECIMAL' },
                    { name: 'CURRENCY', type: 'VARCHAR' },
                    { name: 'STATUS', type: 'VARCHAR' },
                    { name: 'SHIPPING_ADDRESS', type: 'VARIANT' },
                    { name: 'LINE_ITEMS', type: 'VARIANT' },
                    { name: '_LOADED_AT', type: 'TIMESTAMP' },
                  ]
                },
                {
                  id: 'payments',
                  name: 'PAYMENTS',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['stg_payments'],
                  columns: [
                    { name: 'PAYMENT_ID', type: 'VARCHAR', isPrimaryKey: true },
                    { name: 'ORDER_ID', type: 'VARCHAR', isForeignKey: true },
                    { name: 'AMOUNT', type: 'DECIMAL' },
                    { name: 'CURRENCY', type: 'VARCHAR' },
                    { name: 'PAYMENT_METHOD', type: 'VARCHAR' },
                    { name: 'STATUS', type: 'VARCHAR' },
                    { name: 'PROCESSED_AT', type: 'TIMESTAMP' },
                    { name: '_LOADED_AT', type: 'TIMESTAMP' },
                  ]
                },
                {
                  id: 'customers',
                  name: 'CUSTOMERS',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['stg_customers', 'stg_orders'],
                  columns: [
                    { name: 'CUSTOMER_ID', type: 'VARCHAR', isPrimaryKey: true },
                    { name: 'EMAIL', type: 'VARCHAR' },
                    { name: 'FIRST_NAME', type: 'VARCHAR' },
                    { name: 'LAST_NAME', type: 'VARCHAR' },
                    { name: 'COMPANY', type: 'VARCHAR' },
                    { name: 'PHONE', type: 'VARCHAR' },
                    { name: 'ADDRESS', type: 'VARIANT' },
                    { name: 'CREATED_AT', type: 'TIMESTAMP' },
                    { name: '_LOADED_AT', type: 'TIMESTAMP' },
                  ]
                },
              ]
            },
            {
              id: 'raw-marketing',
              name: 'RAW_MARKETING',
              items: [
                {
                  id: 'ga_sessions',
                  name: 'GA_SESSIONS',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['stg_sessions'],
                  columns: [
                    { name: 'SESSION_ID', type: 'VARCHAR', isPrimaryKey: true },
                    { name: 'CLIENT_ID', type: 'VARCHAR' },
                    { name: 'USER_ID', type: 'VARCHAR' },
                    { name: 'SESSION_START', type: 'TIMESTAMP' },
                    { name: 'SESSION_END', type: 'TIMESTAMP' },
                    { name: 'PAGE_VIEWS', type: 'INTEGER' },
                    { name: 'LANDING_PAGE', type: 'VARCHAR' },
                    { name: 'EXIT_PAGE', type: 'VARCHAR' },
                    { name: 'DEVICE_CATEGORY', type: 'VARCHAR' },
                    { name: 'COUNTRY', type: 'VARCHAR' },
                    { name: '_LOADED_AT', type: 'TIMESTAMP' },
                  ]
                },
                {
                  id: 'ga_events',
                  name: 'GA_EVENTS',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['stg_web_events'],
                  columns: [
                    { name: 'EVENT_ID', type: 'VARCHAR', isPrimaryKey: true },
                    { name: 'SESSION_ID', type: 'VARCHAR', isForeignKey: true },
                    { name: 'EVENT_NAME', type: 'VARCHAR' },
                    { name: 'EVENT_TIMESTAMP', type: 'TIMESTAMP' },
                    { name: 'PAGE_LOCATION', type: 'VARCHAR' },
                    { name: 'EVENT_PARAMS', type: 'VARIANT' },
                    { name: '_LOADED_AT', type: 'TIMESTAMP' },
                  ]
                },
                {
                  id: 'ad_spend',
                  name: 'AD_SPEND',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['stg_ad_spend'],
                  columns: [
                    { name: 'AD_ID', type: 'VARCHAR', isPrimaryKey: true },
                    { name: 'CAMPAIGN_ID', type: 'VARCHAR' },
                    { name: 'CAMPAIGN_NAME', type: 'VARCHAR' },
                    { name: 'ADSET_ID', type: 'VARCHAR' },
                    { name: 'DATE', type: 'DATE' },
                    { name: 'SPEND', type: 'DECIMAL' },
                    { name: 'IMPRESSIONS', type: 'INTEGER' },
                    { name: 'CLICKS', type: 'INTEGER' },
                    { name: 'CONVERSIONS', type: 'INTEGER' },
                    { name: '_LOADED_AT', type: 'TIMESTAMP' },
                  ]
                },
                {
                  id: 'product_events',
                  name: 'PRODUCT_EVENTS',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['stg_web_events', 'stg_sessions'],
                  columns: [
                    { name: 'EVENT_ID', type: 'VARCHAR', isPrimaryKey: true },
                    { name: 'USER_ID', type: 'VARCHAR' },
                    { name: 'EVENT_NAME', type: 'VARCHAR' },
                    { name: 'EVENT_TIME', type: 'TIMESTAMP' },
                    { name: 'PROPERTIES', type: 'VARIANT' },
                    { name: 'SESSION_ID', type: 'VARCHAR' },
                    { name: '_LOADED_AT', type: 'TIMESTAMP' },
                  ]
                },
              ]
            }
          ]
        }
      ]
    },

    // =========================================
    // DEPTH -1: Staging Views (Transformed)
    // =========================================
    {
      id: 'depth-3',
      level: -1,
      label: 'Upstream −1',
      type: 'upstream',
      groups: [
        {
          id: 'acme-transform-db',
          database: 'ACME_PROD',
          icon: './img/logo-snowflake.svg',
          type: 'database',
          schemas: [
            {
              id: 'staging',
              name: 'STAGING',
              items: [
                {
                  id: 'stg_orders',
                  name: 'STG_ORDERS',
                  objType: OBJ_TYPES.VIEW,
                  icon: './img/ui/view.svg',
                  downstream: ['fct_customer_orders'],
                  columns: [
                    { name: 'ORDER_ID', type: 'VARCHAR', isPrimaryKey: true },
                    { name: 'CUSTOMER_ID', type: 'VARCHAR', isForeignKey: true },
                    { name: 'CUSTOMER_EMAIL', type: 'VARCHAR' },
                    { name: 'ORDER_DATE', type: 'DATE' },
                    { name: 'ORDER_TIMESTAMP', type: 'TIMESTAMP' },
                    { name: 'ORDER_AMOUNT_USD', type: 'DECIMAL' },
                    { name: 'ORDER_STATUS', type: 'VARCHAR' },
                    { name: 'SHIPPING_COUNTRY', type: 'VARCHAR' },
                    { name: 'SHIPPING_CITY', type: 'VARCHAR' },
                    { name: 'ITEM_COUNT', type: 'INTEGER' },
                  ]
                },
                {
                  id: 'stg_payments',
                  name: 'STG_PAYMENTS',
                  objType: OBJ_TYPES.VIEW,
                  icon: './img/ui/view.svg',
                  downstream: ['fct_customer_orders'],
                  columns: [
                    { name: 'PAYMENT_ID', type: 'VARCHAR', isPrimaryKey: true },
                    { name: 'ORDER_ID', type: 'VARCHAR', isForeignKey: true },
                    { name: 'PAYMENT_AMOUNT_USD', type: 'DECIMAL' },
                    { name: 'PAYMENT_METHOD', type: 'VARCHAR' },
                    { name: 'PAYMENT_STATUS', type: 'VARCHAR' },
                    { name: 'PROCESSED_AT', type: 'TIMESTAMP' },
                    { name: 'IS_SUCCESSFUL', type: 'BOOLEAN' },
                  ]
                },
                {
                  id: 'stg_customers',
                  name: 'STG_CUSTOMERS',
                  objType: OBJ_TYPES.VIEW,
                  icon: './img/ui/view.svg',
                  downstream: ['fct_customer_orders'],
                  columns: [
                    { name: 'CUSTOMER_ID', type: 'VARCHAR', isPrimaryKey: true },
                    { name: 'EMAIL', type: 'VARCHAR' },
                    { name: 'FULL_NAME', type: 'VARCHAR' },
                    { name: 'FIRST_NAME', type: 'VARCHAR' },
                    { name: 'LAST_NAME', type: 'VARCHAR' },
                    { name: 'COMPANY_NAME', type: 'VARCHAR' },
                    { name: 'PHONE_NUMBER', type: 'VARCHAR' },
                    { name: 'COUNTRY', type: 'VARCHAR' },
                    { name: 'CITY', type: 'VARCHAR' },
                    { name: 'CREATED_AT', type: 'TIMESTAMP' },
                    { name: 'DAYS_SINCE_SIGNUP', type: 'INTEGER' },
                  ]
                },
                {
                  id: 'stg_sessions',
                  name: 'STG_SESSIONS',
                  objType: OBJ_TYPES.VIEW,
                  icon: './img/ui/view.svg',
                  downstream: ['fct_customer_orders'],
                  columns: [
                    { name: 'SESSION_ID', type: 'VARCHAR', isPrimaryKey: true },
                    { name: 'USER_ID', type: 'VARCHAR' },
                    { name: 'SESSION_DATE', type: 'DATE' },
                    { name: 'SESSION_START_TIME', type: 'TIMESTAMP' },
                    { name: 'SESSION_DURATION_SECONDS', type: 'INTEGER' },
                    { name: 'PAGE_VIEWS', type: 'INTEGER' },
                    { name: 'LANDING_PAGE_PATH', type: 'VARCHAR' },
                    { name: 'EXIT_PAGE_PATH', type: 'VARCHAR' },
                    { name: 'DEVICE_TYPE', type: 'VARCHAR' },
                    { name: 'BROWSER', type: 'VARCHAR' },
                    { name: 'COUNTRY', type: 'VARCHAR' },
                    { name: 'IS_BOUNCE', type: 'BOOLEAN' },
                  ]
                },
                {
                  id: 'stg_web_events',
                  name: 'STG_WEB_EVENTS',
                  objType: OBJ_TYPES.VIEW,
                  icon: './img/ui/view.svg',
                  downstream: ['fct_customer_orders'],
                  columns: [
                    { name: 'EVENT_ID', type: 'VARCHAR', isPrimaryKey: true },
                    { name: 'SESSION_ID', type: 'VARCHAR', isForeignKey: true },
                    { name: 'USER_ID', type: 'VARCHAR' },
                    { name: 'EVENT_NAME', type: 'VARCHAR' },
                    { name: 'EVENT_TIMESTAMP', type: 'TIMESTAMP' },
                    { name: 'EVENT_DATE', type: 'DATE' },
                    { name: 'PAGE_PATH', type: 'VARCHAR' },
                    { name: 'EVENT_PROPERTIES', type: 'VARIANT' },
                    { name: 'IS_CONVERSION', type: 'BOOLEAN' },
                  ]
                },
                {
                  id: 'stg_ad_spend',
                  name: 'STG_AD_SPEND',
                  objType: OBJ_TYPES.VIEW,
                  icon: './img/ui/view.svg',
                  downstream: [],
                  columns: [
                    { name: 'AD_ID', type: 'VARCHAR', isPrimaryKey: true },
                    { name: 'CAMPAIGN_ID', type: 'VARCHAR' },
                    { name: 'CAMPAIGN_NAME', type: 'VARCHAR' },
                    { name: 'AD_DATE', type: 'DATE' },
                    { name: 'SPEND_USD', type: 'DECIMAL' },
                    { name: 'IMPRESSIONS', type: 'INTEGER' },
                    { name: 'CLICKS', type: 'INTEGER' },
                    { name: 'CONVERSIONS', type: 'INTEGER' },
                    { name: 'CTR', type: 'DECIMAL' },
                    { name: 'CPC', type: 'DECIMAL' },
                    { name: 'CPM', type: 'DECIMAL' },
                  ]
                },
              ]
            }
          ]
        }
      ]
    },

    // =========================================
    // DEPTH 0: Focal Object (Currently Viewing)
    // =========================================
    {
      id: 'depth-4',
      level: 0,
      label: 'Currently viewing',
      type: 'focal',
      groups: [
        {
          id: 'acme-analytics-db',
          database: 'ANALYTICS_DB',
          icon: './img/logo-snowflake.svg',
          type: 'database',
          schemas: [
            {
              id: 'analytics',
              name: 'ANALYTICS',
              items: [
                {
                  id: 'fct_customer_orders',
                  name: 'FCT_CUSTOMER_ORDERS',
                  objType: OBJ_TYPES.DATASET,
                  icon: './img/dataset.svg',
                  downstream: ['dim_customers', 'fct_daily_revenue', 'fct_attribution', 'user_journey_agg'],
                  isFocal: true,
                  columns: [
                    { name: 'ORDER_KEY', type: 'INTEGER', isPrimaryKey: true },
                    { name: 'ORDER_ID', type: 'VARCHAR' },
                    { name: 'CUSTOMER_KEY', type: 'INTEGER', isForeignKey: true },
                    { name: 'CUSTOMER_ID', type: 'VARCHAR' },
                    { name: 'CUSTOMER_EMAIL', type: 'VARCHAR' },
                    { name: 'CUSTOMER_NAME', type: 'VARCHAR' },
                    { name: 'ORDER_DATE', type: 'DATE' },
                    { name: 'ORDER_TIMESTAMP', type: 'TIMESTAMP' },
                    { name: 'ORDER_AMOUNT', type: 'DECIMAL' },
                    { name: 'PAYMENT_AMOUNT', type: 'DECIMAL' },
                    { name: 'PAYMENT_METHOD', type: 'VARCHAR' },
                    { name: 'ORDER_STATUS', type: 'VARCHAR' },
                    { name: 'PAYMENT_STATUS', type: 'VARCHAR' },
                    { name: 'ITEM_COUNT', type: 'INTEGER' },
                    { name: 'FIRST_ORDER_FLAG', type: 'BOOLEAN' },
                    { name: 'DAYS_SINCE_LAST_ORDER', type: 'INTEGER' },
                    { name: 'SESSION_ID', type: 'VARCHAR' },
                    { name: 'ATTRIBUTION_CHANNEL', type: 'VARCHAR' },
                    { name: 'DEVICE_TYPE', type: 'VARCHAR' },
                    { name: 'COUNTRY', type: 'VARCHAR' },
                  ]
                },
              ]
            }
          ]
        }
      ]
    },

    // =========================================
    // DEPTH +1: Marts (Dimensional Model)
    // =========================================
    {
      id: 'depth-5',
      level: 1,
      label: 'Downstream +1',
      type: 'downstream',
      groups: [
        {
          id: 'acme-marts-db',
          database: 'ACME_ANALYTICS',
          icon: './img/logo-snowflake.svg',
          type: 'database',
          schemas: [
            {
              id: 'marts',
              name: 'MARTS',
              items: [
                {
                  id: 'dim_customers',
                  name: 'DIM_CUSTOMERS',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['customer-360-dashboard', 'churn_prediction_model'],
                  columns: [
                    { name: 'CUSTOMER_KEY', type: 'INTEGER', isPrimaryKey: true },
                    { name: 'CUSTOMER_ID', type: 'VARCHAR' },
                    { name: 'EMAIL', type: 'VARCHAR' },
                    { name: 'FULL_NAME', type: 'VARCHAR' },
                    { name: 'FIRST_NAME', type: 'VARCHAR' },
                    { name: 'LAST_NAME', type: 'VARCHAR' },
                    { name: 'COMPANY', type: 'VARCHAR' },
                    { name: 'COUNTRY', type: 'VARCHAR' },
                    { name: 'CITY', type: 'VARCHAR' },
                    { name: 'FIRST_ORDER_DATE', type: 'DATE' },
                    { name: 'MOST_RECENT_ORDER_DATE', type: 'DATE' },
                    { name: 'TOTAL_ORDERS', type: 'INTEGER' },
                    { name: 'TOTAL_REVENUE', type: 'DECIMAL' },
                    { name: 'AVERAGE_ORDER_VALUE', type: 'DECIMAL' },
                    { name: 'CUSTOMER_LIFETIME_DAYS', type: 'INTEGER' },
                    { name: 'CUSTOMER_SEGMENT', type: 'VARCHAR' },
                    { name: 'IS_ACTIVE', type: 'BOOLEAN' },
                  ]
                },
                {
                  id: 'fct_daily_revenue',
                  name: 'FCT_DAILY_REVENUE',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['exec-revenue-dashboard'],
                  columns: [
                    { name: 'DATE_KEY', type: 'INTEGER', isPrimaryKey: true },
                    { name: 'REVENUE_DATE', type: 'DATE' },
                    { name: 'TOTAL_REVENUE', type: 'DECIMAL' },
                    { name: 'ORDER_COUNT', type: 'INTEGER' },
                    { name: 'UNIQUE_CUSTOMERS', type: 'INTEGER' },
                    { name: 'NEW_CUSTOMERS', type: 'INTEGER' },
                    { name: 'RETURNING_CUSTOMERS', type: 'INTEGER' },
                    { name: 'AVERAGE_ORDER_VALUE', type: 'DECIMAL' },
                    { name: 'REFUND_AMOUNT', type: 'DECIMAL' },
                    { name: 'NET_REVENUE', type: 'DECIMAL' },
                    { name: 'REVENUE_GROWTH_PCT', type: 'DECIMAL' },
                  ]
                },
                {
                  id: 'fct_attribution',
                  name: 'FCT_ATTRIBUTION',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['marketing-roi-dashboard', 'attribution_model'],
                  columns: [
                    { name: 'ATTRIBUTION_KEY', type: 'INTEGER', isPrimaryKey: true },
                    { name: 'ORDER_ID', type: 'VARCHAR', isForeignKey: true },
                    { name: 'CUSTOMER_ID', type: 'VARCHAR' },
                    { name: 'ATTRIBUTION_DATE', type: 'DATE' },
                    { name: 'CHANNEL', type: 'VARCHAR' },
                    { name: 'CAMPAIGN_ID', type: 'VARCHAR' },
                    { name: 'CAMPAIGN_NAME', type: 'VARCHAR' },
                    { name: 'TOUCHPOINT_COUNT', type: 'INTEGER' },
                    { name: 'FIRST_TOUCH_CHANNEL', type: 'VARCHAR' },
                    { name: 'LAST_TOUCH_CHANNEL', type: 'VARCHAR' },
                    { name: 'ATTRIBUTED_REVENUE', type: 'DECIMAL' },
                    { name: 'ATTRIBUTION_MODEL', type: 'VARCHAR' },
                  ]
                },
                {
                  id: 'user_journey_agg',
                  name: 'USER_JOURNEY_AGG',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: [],
                  columns: [
                    { name: 'JOURNEY_KEY', type: 'INTEGER', isPrimaryKey: true },
                    { name: 'USER_ID', type: 'VARCHAR' },
                    { name: 'JOURNEY_DATE', type: 'DATE' },
                    { name: 'TOTAL_SESSIONS', type: 'INTEGER' },
                    { name: 'TOTAL_PAGE_VIEWS', type: 'INTEGER' },
                    { name: 'TOTAL_EVENTS', type: 'INTEGER' },
                    { name: 'CONVERSION_COUNT', type: 'INTEGER' },
                    { name: 'DAYS_TO_CONVERT', type: 'INTEGER' },
                    { name: 'JOURNEY_STAGE', type: 'VARCHAR' },
                    { name: 'PRIMARY_DEVICE', type: 'VARCHAR' },
                    { name: 'PRIMARY_CHANNEL', type: 'VARCHAR' },
                  ]
                },
              ]
            }
          ]
        }
      ]
    },

    // =========================================
    // DEPTH +2: BI Tools & ML Models
    // =========================================
    {
      id: 'depth-6',
      level: 2,
      label: 'Downstream +2',
      type: 'downstream',
      groups: [
        {
          id: 'tableau',
          name: 'Tableau',
          icon: './img/logo-tableau.svg',
          type: 'platform',
          items: [
            {
              id: 'exec-revenue-dashboard',
              name: 'Exec Revenue Dashboard',
              objType: OBJ_TYPES.DASHBOARD,
              icon: './img/ui/dashboards.svg',
              downstream: ['finance-weekly-report'],
              // Dashboards have "metrics" or "fields" instead of columns
              columns: [
                { name: 'Daily Revenue', type: 'MEASURE' },
                { name: 'Revenue Trend', type: 'MEASURE' },
                { name: 'Order Count', type: 'MEASURE' },
                { name: 'AOV', type: 'MEASURE' },
                { name: 'Customer Count', type: 'MEASURE' },
                { name: 'Date', type: 'DIMENSION' },
                { name: 'Region', type: 'DIMENSION' },
              ]
            },
          ]
        },
        {
          id: 'looker',
          name: 'Looker',
          icon: './img/logo-looker.svg',
          type: 'platform',
          items: [
            {
              id: 'customer-360-dashboard',
              name: 'Customer 360 Dashboard',
              objType: OBJ_TYPES.DASHBOARD,
              icon: './img/ui/dashboards.svg',
              downstream: ['investor-data-room'],
              columns: [
                { name: 'Customer Segments', type: 'DIMENSION' },
                { name: 'Lifetime Value', type: 'MEASURE' },
                { name: 'Total Orders', type: 'MEASURE' },
                { name: 'Avg Order Value', type: 'MEASURE' },
                { name: 'Churn Risk', type: 'MEASURE' },
                { name: 'Customer Since', type: 'DIMENSION' },
                { name: 'Country', type: 'DIMENSION' },
              ]
            },
            {
              id: 'marketing-roi-dashboard',
              name: 'Marketing ROI Dashboard',
              objType: OBJ_TYPES.DASHBOARD,
              icon: './img/ui/dashboards.svg',
              downstream: [],
              columns: [
                { name: 'Channel', type: 'DIMENSION' },
                { name: 'Campaign', type: 'DIMENSION' },
                { name: 'Spend', type: 'MEASURE' },
                { name: 'Revenue', type: 'MEASURE' },
                { name: 'ROAS', type: 'MEASURE' },
                { name: 'Conversions', type: 'MEASURE' },
                { name: 'CPA', type: 'MEASURE' },
              ]
            },
          ]
        },
        {
          id: 'ml-models',
          name: 'ML Models',
          icon: './img/model.svg',
          type: 'platform',
          items: [
            {
              id: 'churn_prediction_model',
              name: 'Churn Prediction Model',
              objType: OBJ_TYPES.MODEL,
              icon: './img/model.svg',
              downstream: [],
              // ML Models have "features" instead of columns
              features: [
                { name: 'days_since_last_order', type: 'NUMERIC', importance: 0.23 },
                { name: 'total_orders', type: 'NUMERIC', importance: 0.18 },
                { name: 'average_order_value', type: 'NUMERIC', importance: 0.15 },
                { name: 'customer_lifetime_days', type: 'NUMERIC', importance: 0.12 },
                { name: 'total_revenue', type: 'NUMERIC', importance: 0.11 },
                { name: 'order_frequency', type: 'NUMERIC', importance: 0.09 },
                { name: 'country', type: 'CATEGORICAL', importance: 0.07 },
                { name: 'customer_segment', type: 'CATEGORICAL', importance: 0.05 },
              ],
              // Model also has outputs/predictions
              outputs: [
                { name: 'churn_probability', type: 'NUMERIC' },
                { name: 'churn_risk_tier', type: 'CATEGORICAL' },
                { name: 'days_to_churn', type: 'NUMERIC' },
              ]
            },
            {
              id: 'attribution_model',
              name: 'Attribution Model',
              objType: OBJ_TYPES.MODEL,
              icon: './img/model.svg',
              downstream: [],
              features: [
                { name: 'channel', type: 'CATEGORICAL', importance: 0.25 },
                { name: 'touchpoint_sequence', type: 'SEQUENCE', importance: 0.20 },
                { name: 'time_to_conversion', type: 'NUMERIC', importance: 0.18 },
                { name: 'touchpoint_count', type: 'NUMERIC', importance: 0.15 },
                { name: 'campaign_type', type: 'CATEGORICAL', importance: 0.12 },
                { name: 'device_type', type: 'CATEGORICAL', importance: 0.10 },
              ],
              outputs: [
                { name: 'channel_attribution_weight', type: 'NUMERIC' },
                { name: 'attributed_revenue', type: 'NUMERIC' },
                { name: 'model_confidence', type: 'NUMERIC' },
              ]
            },
          ]
        }
      ]
    },

    // =========================================
    // DEPTH +3: Exports & Destinations
    // =========================================
    {
      id: 'depth-7',
      level: 3,
      label: 'Downstream +3',
      type: 'downstream',
      groups: [
        {
          id: 'exports',
          name: 'Exports',
          icon: './img/api.svg',
          type: 'platform',
          items: [
            {
              id: 'finance-weekly-report',
              name: 'Finance Weekly Report',
              objType: OBJ_TYPES.EXTERNAL,
              icon: './img/api.svg',
              downstream: [],
              columns: [
                { name: 'Report Date', type: 'DATE' },
                { name: 'Weekly Revenue', type: 'DECIMAL' },
                { name: 'WoW Growth', type: 'DECIMAL' },
                { name: 'Order Summary', type: 'JSON' },
              ]
            },
            {
              id: 'investor-data-room',
              name: 'Investor Data Room',
              objType: OBJ_TYPES.EXTERNAL,
              icon: './img/api.svg',
              downstream: [],
              columns: [
                { name: 'Report Period', type: 'DATE' },
                { name: 'ARR', type: 'DECIMAL' },
                { name: 'Customer Count', type: 'INTEGER' },
                { name: 'Retention Rate', type: 'DECIMAL' },
                { name: 'Growth Metrics', type: 'JSON' },
              ]
            },
          ]
        }
      ]
    }
  ]
};

// =============================================
// Column Lineage Relationships
// Maps source columns to target columns
// =============================================
const columnLineage = [
  // =========================================
  // Shopify API → ORDERS (raw)
  // =========================================
  { id: 'cl-1', sourceTable: 'shopify-api', sourceColumn: 'order_id', targetTable: 'orders', targetColumn: 'ORDER_ID', transformType: 'DIRECT' },
  { id: 'cl-2', sourceTable: 'shopify-api', sourceColumn: 'customer_id', targetTable: 'orders', targetColumn: 'CUSTOMER_ID', transformType: 'DIRECT' },
  { id: 'cl-3', sourceTable: 'shopify-api', sourceColumn: 'order_date', targetTable: 'orders', targetColumn: 'ORDER_DATE', transformType: 'DIRECT' },
  { id: 'cl-4', sourceTable: 'shopify-api', sourceColumn: 'total_amount', targetTable: 'orders', targetColumn: 'TOTAL_AMOUNT', transformType: 'DIRECT' },
  { id: 'cl-5', sourceTable: 'shopify-api', sourceColumn: 'currency', targetTable: 'orders', targetColumn: 'CURRENCY', transformType: 'DIRECT' },
  { id: 'cl-6', sourceTable: 'shopify-api', sourceColumn: 'status', targetTable: 'orders', targetColumn: 'STATUS', transformType: 'DIRECT' },
  { id: 'cl-7', sourceTable: 'shopify-api', sourceColumn: 'shipping_address', targetTable: 'orders', targetColumn: 'SHIPPING_ADDRESS', transformType: 'DIRECT' },
  { id: 'cl-8', sourceTable: 'shopify-api', sourceColumn: 'line_items', targetTable: 'orders', targetColumn: 'LINE_ITEMS', transformType: 'DIRECT' },

  // =========================================
  // Stripe API → PAYMENTS (raw)
  // =========================================
  { id: 'cl-9', sourceTable: 'stripe-api', sourceColumn: 'payment_id', targetTable: 'payments', targetColumn: 'PAYMENT_ID', transformType: 'DIRECT' },
  { id: 'cl-10', sourceTable: 'stripe-api', sourceColumn: 'amount', targetTable: 'payments', targetColumn: 'AMOUNT', transformType: 'CAST' },
  { id: 'cl-11', sourceTable: 'stripe-api', sourceColumn: 'currency', targetTable: 'payments', targetColumn: 'CURRENCY', transformType: 'DIRECT' },
  { id: 'cl-12', sourceTable: 'stripe-api', sourceColumn: 'payment_method', targetTable: 'payments', targetColumn: 'PAYMENT_METHOD', transformType: 'DIRECT' },
  { id: 'cl-13', sourceTable: 'stripe-api', sourceColumn: 'status', targetTable: 'payments', targetColumn: 'STATUS', transformType: 'DIRECT' },
  { id: 'cl-14', sourceTable: 'stripe-api', sourceColumn: 'created_at', targetTable: 'payments', targetColumn: 'PROCESSED_AT', transformType: 'RENAME' },

  // =========================================
  // Salesforce API → CUSTOMERS (raw)
  // =========================================
  { id: 'cl-15', sourceTable: 'salesforce-api', sourceColumn: 'contact_id', targetTable: 'customers', targetColumn: 'CUSTOMER_ID', transformType: 'RENAME' },
  { id: 'cl-16', sourceTable: 'salesforce-api', sourceColumn: 'email', targetTable: 'customers', targetColumn: 'EMAIL', transformType: 'DIRECT' },
  { id: 'cl-17', sourceTable: 'salesforce-api', sourceColumn: 'first_name', targetTable: 'customers', targetColumn: 'FIRST_NAME', transformType: 'DIRECT' },
  { id: 'cl-18', sourceTable: 'salesforce-api', sourceColumn: 'last_name', targetTable: 'customers', targetColumn: 'LAST_NAME', transformType: 'DIRECT' },
  { id: 'cl-19', sourceTable: 'salesforce-api', sourceColumn: 'company', targetTable: 'customers', targetColumn: 'COMPANY', transformType: 'DIRECT' },
  { id: 'cl-20', sourceTable: 'salesforce-api', sourceColumn: 'phone', targetTable: 'customers', targetColumn: 'PHONE', transformType: 'DIRECT' },
  { id: 'cl-21', sourceTable: 'salesforce-api', sourceColumn: 'created_date', targetTable: 'customers', targetColumn: 'CREATED_AT', transformType: 'RENAME' },

  // =========================================
  // ORDERS (raw) → STG_ORDERS
  // =========================================
  { id: 'cl-30', sourceTable: 'orders', sourceColumn: 'ORDER_ID', targetTable: 'stg_orders', targetColumn: 'ORDER_ID', transformType: 'DIRECT' },
  { id: 'cl-31', sourceTable: 'orders', sourceColumn: 'CUSTOMER_ID', targetTable: 'stg_orders', targetColumn: 'CUSTOMER_ID', transformType: 'DIRECT' },
  { id: 'cl-32', sourceTable: 'orders', sourceColumn: 'ORDER_DATE', targetTable: 'stg_orders', targetColumn: 'ORDER_TIMESTAMP', transformType: 'DIRECT' },
  { id: 'cl-33', sourceTable: 'orders', sourceColumn: 'ORDER_DATE', targetTable: 'stg_orders', targetColumn: 'ORDER_DATE', transformType: 'DATE_TRUNC' },
  { id: 'cl-34', sourceTable: 'orders', sourceColumn: 'TOTAL_AMOUNT', targetTable: 'stg_orders', targetColumn: 'ORDER_AMOUNT_USD', transformType: 'CURRENCY_CONVERT' },
  { id: 'cl-35', sourceTable: 'orders', sourceColumn: 'STATUS', targetTable: 'stg_orders', targetColumn: 'ORDER_STATUS', transformType: 'DIRECT' },
  { id: 'cl-36', sourceTable: 'orders', sourceColumn: 'SHIPPING_ADDRESS', targetTable: 'stg_orders', targetColumn: 'SHIPPING_COUNTRY', transformType: 'JSON_EXTRACT' },
  { id: 'cl-37', sourceTable: 'orders', sourceColumn: 'SHIPPING_ADDRESS', targetTable: 'stg_orders', targetColumn: 'SHIPPING_CITY', transformType: 'JSON_EXTRACT' },
  { id: 'cl-38', sourceTable: 'orders', sourceColumn: 'LINE_ITEMS', targetTable: 'stg_orders', targetColumn: 'ITEM_COUNT', transformType: 'ARRAY_SIZE' },
  { id: 'cl-39', sourceTable: 'customers', sourceColumn: 'EMAIL', targetTable: 'stg_orders', targetColumn: 'CUSTOMER_EMAIL', transformType: 'JOIN' },

  // =========================================
  // PAYMENTS (raw) → STG_PAYMENTS
  // =========================================
  { id: 'cl-40', sourceTable: 'payments', sourceColumn: 'PAYMENT_ID', targetTable: 'stg_payments', targetColumn: 'PAYMENT_ID', transformType: 'DIRECT' },
  { id: 'cl-41', sourceTable: 'payments', sourceColumn: 'ORDER_ID', targetTable: 'stg_payments', targetColumn: 'ORDER_ID', transformType: 'DIRECT' },
  { id: 'cl-42', sourceTable: 'payments', sourceColumn: 'AMOUNT', targetTable: 'stg_payments', targetColumn: 'PAYMENT_AMOUNT_USD', transformType: 'CURRENCY_CONVERT' },
  { id: 'cl-43', sourceTable: 'payments', sourceColumn: 'PAYMENT_METHOD', targetTable: 'stg_payments', targetColumn: 'PAYMENT_METHOD', transformType: 'DIRECT' },
  { id: 'cl-44', sourceTable: 'payments', sourceColumn: 'STATUS', targetTable: 'stg_payments', targetColumn: 'PAYMENT_STATUS', transformType: 'DIRECT' },
  { id: 'cl-45', sourceTable: 'payments', sourceColumn: 'PROCESSED_AT', targetTable: 'stg_payments', targetColumn: 'PROCESSED_AT', transformType: 'DIRECT' },
  { id: 'cl-46', sourceTable: 'payments', sourceColumn: 'STATUS', targetTable: 'stg_payments', targetColumn: 'IS_SUCCESSFUL', transformType: 'CASE_WHEN' },

  // =========================================
  // CUSTOMERS (raw) → STG_CUSTOMERS
  // =========================================
  { id: 'cl-50', sourceTable: 'customers', sourceColumn: 'CUSTOMER_ID', targetTable: 'stg_customers', targetColumn: 'CUSTOMER_ID', transformType: 'DIRECT' },
  { id: 'cl-51', sourceTable: 'customers', sourceColumn: 'EMAIL', targetTable: 'stg_customers', targetColumn: 'EMAIL', transformType: 'DIRECT' },
  { id: 'cl-52', sourceTable: 'customers', sourceColumn: 'FIRST_NAME', targetTable: 'stg_customers', targetColumn: 'FIRST_NAME', transformType: 'DIRECT' },
  { id: 'cl-53', sourceTable: 'customers', sourceColumn: 'LAST_NAME', targetTable: 'stg_customers', targetColumn: 'LAST_NAME', transformType: 'DIRECT' },
  { id: 'cl-54', sourceTable: 'customers', sourceColumn: 'FIRST_NAME', targetTable: 'stg_customers', targetColumn: 'FULL_NAME', transformType: 'CONCAT' },
  { id: 'cl-55', sourceTable: 'customers', sourceColumn: 'LAST_NAME', targetTable: 'stg_customers', targetColumn: 'FULL_NAME', transformType: 'CONCAT' },
  { id: 'cl-56', sourceTable: 'customers', sourceColumn: 'COMPANY', targetTable: 'stg_customers', targetColumn: 'COMPANY_NAME', transformType: 'RENAME' },
  { id: 'cl-57', sourceTable: 'customers', sourceColumn: 'PHONE', targetTable: 'stg_customers', targetColumn: 'PHONE_NUMBER', transformType: 'RENAME' },
  { id: 'cl-58', sourceTable: 'customers', sourceColumn: 'ADDRESS', targetTable: 'stg_customers', targetColumn: 'COUNTRY', transformType: 'JSON_EXTRACT' },
  { id: 'cl-59', sourceTable: 'customers', sourceColumn: 'ADDRESS', targetTable: 'stg_customers', targetColumn: 'CITY', transformType: 'JSON_EXTRACT' },
  { id: 'cl-60', sourceTable: 'customers', sourceColumn: 'CREATED_AT', targetTable: 'stg_customers', targetColumn: 'CREATED_AT', transformType: 'DIRECT' },
  { id: 'cl-61', sourceTable: 'customers', sourceColumn: 'CREATED_AT', targetTable: 'stg_customers', targetColumn: 'DAYS_SINCE_SIGNUP', transformType: 'DATEDIFF' },

  // =========================================
  // STG_ORDERS → FCT_CUSTOMER_ORDERS
  // =========================================
  { id: 'cl-70', sourceTable: 'stg_orders', sourceColumn: 'ORDER_ID', targetTable: 'fct_customer_orders', targetColumn: 'ORDER_ID', transformType: 'DIRECT' },
  { id: 'cl-71', sourceTable: 'stg_orders', sourceColumn: 'ORDER_ID', targetTable: 'fct_customer_orders', targetColumn: 'ORDER_KEY', transformType: 'SURROGATE_KEY' },
  { id: 'cl-72', sourceTable: 'stg_orders', sourceColumn: 'CUSTOMER_ID', targetTable: 'fct_customer_orders', targetColumn: 'CUSTOMER_ID', transformType: 'DIRECT' },
  { id: 'cl-73', sourceTable: 'stg_orders', sourceColumn: 'CUSTOMER_ID', targetTable: 'fct_customer_orders', targetColumn: 'CUSTOMER_KEY', transformType: 'SURROGATE_KEY' },
  { id: 'cl-74', sourceTable: 'stg_orders', sourceColumn: 'CUSTOMER_EMAIL', targetTable: 'fct_customer_orders', targetColumn: 'CUSTOMER_EMAIL', transformType: 'DIRECT' },
  { id: 'cl-75', sourceTable: 'stg_orders', sourceColumn: 'ORDER_DATE', targetTable: 'fct_customer_orders', targetColumn: 'ORDER_DATE', transformType: 'DIRECT' },
  { id: 'cl-76', sourceTable: 'stg_orders', sourceColumn: 'ORDER_TIMESTAMP', targetTable: 'fct_customer_orders', targetColumn: 'ORDER_TIMESTAMP', transformType: 'DIRECT' },
  { id: 'cl-77', sourceTable: 'stg_orders', sourceColumn: 'ORDER_AMOUNT_USD', targetTable: 'fct_customer_orders', targetColumn: 'ORDER_AMOUNT', transformType: 'DIRECT' },
  { id: 'cl-78', sourceTable: 'stg_orders', sourceColumn: 'ORDER_STATUS', targetTable: 'fct_customer_orders', targetColumn: 'ORDER_STATUS', transformType: 'DIRECT' },
  { id: 'cl-79', sourceTable: 'stg_orders', sourceColumn: 'ITEM_COUNT', targetTable: 'fct_customer_orders', targetColumn: 'ITEM_COUNT', transformType: 'DIRECT' },
  { id: 'cl-80', sourceTable: 'stg_orders', sourceColumn: 'SHIPPING_COUNTRY', targetTable: 'fct_customer_orders', targetColumn: 'COUNTRY', transformType: 'DIRECT' },

  // =========================================
  // STG_PAYMENTS → FCT_CUSTOMER_ORDERS
  // =========================================
  { id: 'cl-81', sourceTable: 'stg_payments', sourceColumn: 'PAYMENT_AMOUNT_USD', targetTable: 'fct_customer_orders', targetColumn: 'PAYMENT_AMOUNT', transformType: 'DIRECT' },
  { id: 'cl-82', sourceTable: 'stg_payments', sourceColumn: 'PAYMENT_METHOD', targetTable: 'fct_customer_orders', targetColumn: 'PAYMENT_METHOD', transformType: 'DIRECT' },
  { id: 'cl-83', sourceTable: 'stg_payments', sourceColumn: 'PAYMENT_STATUS', targetTable: 'fct_customer_orders', targetColumn: 'PAYMENT_STATUS', transformType: 'DIRECT' },

  // =========================================
  // STG_CUSTOMERS → FCT_CUSTOMER_ORDERS
  // =========================================
  { id: 'cl-84', sourceTable: 'stg_customers', sourceColumn: 'FULL_NAME', targetTable: 'fct_customer_orders', targetColumn: 'CUSTOMER_NAME', transformType: 'DIRECT' },

  // =========================================
  // STG_SESSIONS → FCT_CUSTOMER_ORDERS
  // =========================================
  { id: 'cl-85', sourceTable: 'stg_sessions', sourceColumn: 'SESSION_ID', targetTable: 'fct_customer_orders', targetColumn: 'SESSION_ID', transformType: 'JOIN' },
  { id: 'cl-86', sourceTable: 'stg_sessions', sourceColumn: 'DEVICE_TYPE', targetTable: 'fct_customer_orders', targetColumn: 'DEVICE_TYPE', transformType: 'JOIN' },

  // =========================================
  // STG_WEB_EVENTS → FCT_CUSTOMER_ORDERS (attribution)
  // =========================================
  { id: 'cl-87', sourceTable: 'stg_web_events', sourceColumn: 'EVENT_PROPERTIES', targetTable: 'fct_customer_orders', targetColumn: 'ATTRIBUTION_CHANNEL', transformType: 'JSON_EXTRACT' },

  // =========================================
  // FCT_CUSTOMER_ORDERS → DIM_CUSTOMERS
  // =========================================
  { id: 'cl-90', sourceTable: 'fct_customer_orders', sourceColumn: 'CUSTOMER_KEY', targetTable: 'dim_customers', targetColumn: 'CUSTOMER_KEY', transformType: 'DIRECT' },
  { id: 'cl-91', sourceTable: 'fct_customer_orders', sourceColumn: 'CUSTOMER_ID', targetTable: 'dim_customers', targetColumn: 'CUSTOMER_ID', transformType: 'DIRECT' },
  { id: 'cl-92', sourceTable: 'fct_customer_orders', sourceColumn: 'CUSTOMER_EMAIL', targetTable: 'dim_customers', targetColumn: 'EMAIL', transformType: 'DIRECT' },
  { id: 'cl-93', sourceTable: 'fct_customer_orders', sourceColumn: 'CUSTOMER_NAME', targetTable: 'dim_customers', targetColumn: 'FULL_NAME', transformType: 'DIRECT' },
  { id: 'cl-94', sourceTable: 'fct_customer_orders', sourceColumn: 'COUNTRY', targetTable: 'dim_customers', targetColumn: 'COUNTRY', transformType: 'DIRECT' },
  { id: 'cl-95', sourceTable: 'fct_customer_orders', sourceColumn: 'ORDER_DATE', targetTable: 'dim_customers', targetColumn: 'FIRST_ORDER_DATE', transformType: 'MIN' },
  { id: 'cl-96', sourceTable: 'fct_customer_orders', sourceColumn: 'ORDER_DATE', targetTable: 'dim_customers', targetColumn: 'MOST_RECENT_ORDER_DATE', transformType: 'MAX' },
  { id: 'cl-97', sourceTable: 'fct_customer_orders', sourceColumn: 'ORDER_KEY', targetTable: 'dim_customers', targetColumn: 'TOTAL_ORDERS', transformType: 'COUNT' },
  { id: 'cl-98', sourceTable: 'fct_customer_orders', sourceColumn: 'ORDER_AMOUNT', targetTable: 'dim_customers', targetColumn: 'TOTAL_REVENUE', transformType: 'SUM' },
  { id: 'cl-99', sourceTable: 'fct_customer_orders', sourceColumn: 'ORDER_AMOUNT', targetTable: 'dim_customers', targetColumn: 'AVERAGE_ORDER_VALUE', transformType: 'AVG' },

  // =========================================
  // FCT_CUSTOMER_ORDERS → FCT_DAILY_REVENUE
  // =========================================
  { id: 'cl-100', sourceTable: 'fct_customer_orders', sourceColumn: 'ORDER_DATE', targetTable: 'fct_daily_revenue', targetColumn: 'REVENUE_DATE', transformType: 'DIRECT' },
  { id: 'cl-101', sourceTable: 'fct_customer_orders', sourceColumn: 'ORDER_DATE', targetTable: 'fct_daily_revenue', targetColumn: 'DATE_KEY', transformType: 'DATE_TO_INT' },
  { id: 'cl-102', sourceTable: 'fct_customer_orders', sourceColumn: 'ORDER_AMOUNT', targetTable: 'fct_daily_revenue', targetColumn: 'TOTAL_REVENUE', transformType: 'SUM' },
  { id: 'cl-103', sourceTable: 'fct_customer_orders', sourceColumn: 'ORDER_KEY', targetTable: 'fct_daily_revenue', targetColumn: 'ORDER_COUNT', transformType: 'COUNT' },
  { id: 'cl-104', sourceTable: 'fct_customer_orders', sourceColumn: 'CUSTOMER_KEY', targetTable: 'fct_daily_revenue', targetColumn: 'UNIQUE_CUSTOMERS', transformType: 'COUNT_DISTINCT' },
  { id: 'cl-105', sourceTable: 'fct_customer_orders', sourceColumn: 'FIRST_ORDER_FLAG', targetTable: 'fct_daily_revenue', targetColumn: 'NEW_CUSTOMERS', transformType: 'SUM_IF' },
  { id: 'cl-106', sourceTable: 'fct_customer_orders', sourceColumn: 'ORDER_AMOUNT', targetTable: 'fct_daily_revenue', targetColumn: 'AVERAGE_ORDER_VALUE', transformType: 'AVG' },

  // =========================================
  // FCT_CUSTOMER_ORDERS → FCT_ATTRIBUTION
  // =========================================
  { id: 'cl-110', sourceTable: 'fct_customer_orders', sourceColumn: 'ORDER_ID', targetTable: 'fct_attribution', targetColumn: 'ORDER_ID', transformType: 'DIRECT' },
  { id: 'cl-111', sourceTable: 'fct_customer_orders', sourceColumn: 'CUSTOMER_ID', targetTable: 'fct_attribution', targetColumn: 'CUSTOMER_ID', transformType: 'DIRECT' },
  { id: 'cl-112', sourceTable: 'fct_customer_orders', sourceColumn: 'ORDER_DATE', targetTable: 'fct_attribution', targetColumn: 'ATTRIBUTION_DATE', transformType: 'DIRECT' },
  { id: 'cl-113', sourceTable: 'fct_customer_orders', sourceColumn: 'ATTRIBUTION_CHANNEL', targetTable: 'fct_attribution', targetColumn: 'CHANNEL', transformType: 'DIRECT' },
  { id: 'cl-114', sourceTable: 'fct_customer_orders', sourceColumn: 'ORDER_AMOUNT', targetTable: 'fct_attribution', targetColumn: 'ATTRIBUTED_REVENUE', transformType: 'DIRECT' },

  // =========================================
  // DIM_CUSTOMERS → Churn Prediction Model (Features)
  // =========================================
  { id: 'cl-120', sourceTable: 'dim_customers', sourceColumn: 'MOST_RECENT_ORDER_DATE', targetTable: 'churn_prediction_model', targetColumn: 'days_since_last_order', transformType: 'DATEDIFF' },
  { id: 'cl-121', sourceTable: 'dim_customers', sourceColumn: 'TOTAL_ORDERS', targetTable: 'churn_prediction_model', targetColumn: 'total_orders', transformType: 'DIRECT' },
  { id: 'cl-122', sourceTable: 'dim_customers', sourceColumn: 'AVERAGE_ORDER_VALUE', targetTable: 'churn_prediction_model', targetColumn: 'average_order_value', transformType: 'DIRECT' },
  { id: 'cl-123', sourceTable: 'dim_customers', sourceColumn: 'CUSTOMER_LIFETIME_DAYS', targetTable: 'churn_prediction_model', targetColumn: 'customer_lifetime_days', transformType: 'DIRECT' },
  { id: 'cl-124', sourceTable: 'dim_customers', sourceColumn: 'TOTAL_REVENUE', targetTable: 'churn_prediction_model', targetColumn: 'total_revenue', transformType: 'DIRECT' },
  { id: 'cl-125', sourceTable: 'dim_customers', sourceColumn: 'COUNTRY', targetTable: 'churn_prediction_model', targetColumn: 'country', transformType: 'DIRECT' },
  { id: 'cl-126', sourceTable: 'dim_customers', sourceColumn: 'CUSTOMER_SEGMENT', targetTable: 'churn_prediction_model', targetColumn: 'customer_segment', transformType: 'DIRECT' },

  // =========================================
  // FCT_ATTRIBUTION → Attribution Model (Features)
  // =========================================
  { id: 'cl-130', sourceTable: 'fct_attribution', sourceColumn: 'CHANNEL', targetTable: 'attribution_model', targetColumn: 'channel', transformType: 'DIRECT' },
  { id: 'cl-131', sourceTable: 'fct_attribution', sourceColumn: 'TOUCHPOINT_COUNT', targetTable: 'attribution_model', targetColumn: 'touchpoint_count', transformType: 'DIRECT' },
  { id: 'cl-132', sourceTable: 'fct_attribution', sourceColumn: 'CAMPAIGN_NAME', targetTable: 'attribution_model', targetColumn: 'campaign_type', transformType: 'EXTRACT_PATTERN' },

  // =========================================
  // FCT_DAILY_REVENUE → Exec Revenue Dashboard
  // =========================================
  { id: 'cl-140', sourceTable: 'fct_daily_revenue', sourceColumn: 'TOTAL_REVENUE', targetTable: 'exec-revenue-dashboard', targetColumn: 'Daily Revenue', transformType: 'DIRECT' },
  { id: 'cl-141', sourceTable: 'fct_daily_revenue', sourceColumn: 'TOTAL_REVENUE', targetTable: 'exec-revenue-dashboard', targetColumn: 'Revenue Trend', transformType: 'WINDOW_FUNC' },
  { id: 'cl-142', sourceTable: 'fct_daily_revenue', sourceColumn: 'ORDER_COUNT', targetTable: 'exec-revenue-dashboard', targetColumn: 'Order Count', transformType: 'DIRECT' },
  { id: 'cl-143', sourceTable: 'fct_daily_revenue', sourceColumn: 'AVERAGE_ORDER_VALUE', targetTable: 'exec-revenue-dashboard', targetColumn: 'AOV', transformType: 'DIRECT' },
  { id: 'cl-144', sourceTable: 'fct_daily_revenue', sourceColumn: 'UNIQUE_CUSTOMERS', targetTable: 'exec-revenue-dashboard', targetColumn: 'Customer Count', transformType: 'DIRECT' },
  { id: 'cl-145', sourceTable: 'fct_daily_revenue', sourceColumn: 'REVENUE_DATE', targetTable: 'exec-revenue-dashboard', targetColumn: 'Date', transformType: 'DIRECT' },

  // =========================================
  // DIM_CUSTOMERS → Customer 360 Dashboard
  // =========================================
  { id: 'cl-150', sourceTable: 'dim_customers', sourceColumn: 'CUSTOMER_SEGMENT', targetTable: 'customer-360-dashboard', targetColumn: 'Customer Segments', transformType: 'DIRECT' },
  { id: 'cl-151', sourceTable: 'dim_customers', sourceColumn: 'TOTAL_REVENUE', targetTable: 'customer-360-dashboard', targetColumn: 'Lifetime Value', transformType: 'DIRECT' },
  { id: 'cl-152', sourceTable: 'dim_customers', sourceColumn: 'TOTAL_ORDERS', targetTable: 'customer-360-dashboard', targetColumn: 'Total Orders', transformType: 'DIRECT' },
  { id: 'cl-153', sourceTable: 'dim_customers', sourceColumn: 'AVERAGE_ORDER_VALUE', targetTable: 'customer-360-dashboard', targetColumn: 'Avg Order Value', transformType: 'DIRECT' },
  { id: 'cl-154', sourceTable: 'dim_customers', sourceColumn: 'FIRST_ORDER_DATE', targetTable: 'customer-360-dashboard', targetColumn: 'Customer Since', transformType: 'DIRECT' },
  { id: 'cl-155', sourceTable: 'dim_customers', sourceColumn: 'COUNTRY', targetTable: 'customer-360-dashboard', targetColumn: 'Country', transformType: 'DIRECT' },

  // =========================================
  // FCT_ATTRIBUTION → Marketing ROI Dashboard
  // =========================================
  { id: 'cl-160', sourceTable: 'fct_attribution', sourceColumn: 'CHANNEL', targetTable: 'marketing-roi-dashboard', targetColumn: 'Channel', transformType: 'DIRECT' },
  { id: 'cl-161', sourceTable: 'fct_attribution', sourceColumn: 'CAMPAIGN_NAME', targetTable: 'marketing-roi-dashboard', targetColumn: 'Campaign', transformType: 'DIRECT' },
  { id: 'cl-162', sourceTable: 'fct_attribution', sourceColumn: 'ATTRIBUTED_REVENUE', targetTable: 'marketing-roi-dashboard', targetColumn: 'Revenue', transformType: 'SUM' },
];

// =============================================
// Helper Functions
// =============================================

// Find all items across all depths
function getAllItems(data) {
  const items = [];
  data.depths.forEach(depth => {
    depth.groups.forEach(group => {
      if (group.schemas) {
        group.schemas.forEach(schema => {
          schema.items.forEach(item => {
            items.push({
              ...item,
              database: group.database,
              schema: schema.name,
              depthLevel: depth.level,
            });
          });
        });
      } else if (group.items) {
        group.items.forEach(item => {
          items.push({
            ...item,
            platform: group.name,
            depthLevel: depth.level,
          });
        });
      }
    });
  });
  return items;
}

// Build item lookup map
function buildItemMap(data) {
  const map = new Map();
  getAllItems(data).forEach(item => {
    map.set(item.id, item);
  });
  return map;
}

// Find related columns for a given column selection
function findRelatedColumns(itemId, columnName, lineage) {
  const related = new Map(); // Map<itemId, Set<columnName>>
  
  lineage.forEach(edge => {
    if (edge.sourceTable === itemId && edge.sourceColumn === columnName) {
      // This column is a source, find targets
      if (!related.has(edge.targetTable)) {
        related.set(edge.targetTable, new Set());
      }
      related.get(edge.targetTable).add(edge.targetColumn);
    }
    if (edge.targetTable === itemId && edge.targetColumn === columnName) {
      // This column is a target, find sources
      if (!related.has(edge.sourceTable)) {
        related.set(edge.sourceTable, new Set());
      }
      related.get(edge.sourceTable).add(edge.sourceColumn);
    }
  });
  
  return related;
}

// Get upstream columns (sources) for a column
function getUpstreamColumns(itemId, columnName, lineage) {
  return lineage
    .filter(edge => edge.targetTable === itemId && edge.targetColumn === columnName)
    .map(edge => ({
      itemId: edge.sourceTable,
      columnName: edge.sourceColumn,
      transformType: edge.transformType,
    }));
}

// Get downstream columns (targets) for a column
function getDownstreamColumns(itemId, columnName, lineage) {
  return lineage
    .filter(edge => edge.sourceTable === itemId && edge.sourceColumn === columnName)
    .map(edge => ({
      itemId: edge.targetTable,
      columnName: edge.targetColumn,
      transformType: edge.transformType,
    }));
}

// Export for use in main app
if (typeof window !== 'undefined') {
  window.mockLineageData = mockLineageData;
  window.columnLineage = columnLineage;
  window.COLUMN_TYPES = COLUMN_TYPES;
  window.OBJ_TYPES = OBJ_TYPES;
  window.getAllItems = getAllItems;
  window.buildItemMap = buildItemMap;
  window.findRelatedColumns = findRelatedColumns;
  window.getUpstreamColumns = getUpstreamColumns;
  window.getDownstreamColumns = getDownstreamColumns;
}
