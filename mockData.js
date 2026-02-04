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
// External Tool Definitions
// =============================================
const EXTERNAL_TOOLS = {
  FIVETRAN: { name: 'Fivetran', icon: './img/fivetran.svg' },
  DBT: { name: 'dbt', icon: './img/dbt-materialized.svg' },
  AIRFLOW: { name: 'Airflow', icon: './img/airflow-lightmode.svg' },
  STITCH: { name: 'Stitch', icon: './img/automation.svg' },
  SNOWFLAKE: { name: 'Snowflake', icon: './img/snowflake.svg' },
  TABLEAU: { name: 'Tableau', icon: './img/logo-tableau.svg' },
  LOOKER: { name: 'Looker', icon: './img/looker.svg' },
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
              description: 'Real-time order data from Shopify e-commerce platform. Includes order details, line items, and shipping information.',
              owner: 'Integration Team',
              createdAt: '2023-06-15',
              dataQuality: 'High',
              tags: ['source', 'e-commerce', 'real-time'],
              columns: [
                { name: 'order_id', type: 'STRING', description: 'Unique identifier for the order in Shopify' },
                { name: 'customer_id', type: 'STRING', description: 'Reference to the customer who placed the order' },
                { name: 'order_date', type: 'TIMESTAMP', description: 'Timestamp when the order was created' },
                { name: 'total_amount', type: 'DECIMAL', description: 'Total order amount including taxes and shipping' },
                { name: 'currency', type: 'STRING', description: 'ISO 4217 currency code (e.g., USD, EUR)' },
                { name: 'status', type: 'STRING', description: 'Current order status (pending, fulfilled, cancelled)' },
                { name: 'line_items', type: 'ARRAY', description: 'Array of products and quantities in the order' },
                { name: 'shipping_address', type: 'JSON', description: 'Customer shipping address details' },
              ]
            },
            {
              id: 'stripe-api',
              name: 'Stripe Payments API',
              objType: OBJ_TYPES.API,
              icon: './img/api.svg',
              downstream: ['payments'],
              description: 'Payment transaction data from Stripe. Contains payment status, amounts, and processing details.',
              owner: 'Integration Team',
              createdAt: '2023-06-15',
              dataQuality: 'High',
              tags: ['source', 'payments', 'real-time', 'pci'],
              columns: [
                { name: 'payment_id', type: 'STRING', description: 'Stripe payment intent ID' },
                { name: 'charge_id', type: 'STRING', description: 'Stripe charge ID for successful payments' },
                { name: 'amount', type: 'INTEGER', description: 'Payment amount in cents' },
                { name: 'currency', type: 'STRING', description: 'Three-letter ISO currency code' },
                { name: 'customer_id', type: 'STRING', description: 'Stripe customer ID' },
                { name: 'payment_method', type: 'STRING', description: 'Payment method type (card, bank_transfer, etc.)' },
                { name: 'status', type: 'STRING', description: 'Payment status (succeeded, pending, failed)' },
                { name: 'created_at', type: 'TIMESTAMP', description: 'When the payment was initiated' },
              ]
            },
            {
              id: 'salesforce-api',
              name: 'Salesforce CRM',
              objType: OBJ_TYPES.API,
              icon: './img/api.svg',
              downstream: ['customers'],
              description: 'Customer and account data from Salesforce CRM. Primary source for customer master data.',
              owner: 'CRM Team',
              createdAt: '2023-05-20',
              dataQuality: 'High',
              tags: ['source', 'crm', 'customer-data', 'master-data'],
              columns: [
                { name: 'account_id', type: 'STRING', description: 'Salesforce Account ID (18-char)' },
                { name: 'contact_id', type: 'STRING', description: 'Salesforce Contact ID (18-char)' },
                { name: 'email', type: 'STRING', description: 'Primary contact email address' },
                { name: 'first_name', type: 'STRING', description: 'Contact first name' },
                { name: 'last_name', type: 'STRING', description: 'Contact last name' },
                { name: 'company', type: 'STRING', description: 'Account/Company name' },
                { name: 'phone', type: 'STRING', description: 'Primary phone number' },
                { name: 'created_date', type: 'TIMESTAMP', description: 'Record creation timestamp in Salesforce' },
              ]
            },
            {
              id: 'ga4-api',
              name: 'Google Analytics 4',
              objType: OBJ_TYPES.API,
              icon: './img/api.svg',
              downstream: ['ga_sessions', 'ga_events'],
              description: 'Web analytics data from Google Analytics 4. Includes sessions, events, and user behavior.',
              owner: 'Marketing Ops',
              createdAt: '2023-07-01',
              dataQuality: 'Medium',
              tags: ['source', 'analytics', 'web-traffic', 'marketing'],
              columns: [
                { name: 'client_id', type: 'STRING', description: 'GA4 client ID (browser cookie)' },
                { name: 'session_id', type: 'STRING', description: 'Unique session identifier' },
                { name: 'user_id', type: 'STRING', description: 'Custom user ID if authenticated' },
                { name: 'event_name', type: 'STRING', description: 'GA4 event name (page_view, purchase, etc.)' },
                { name: 'event_timestamp', type: 'TIMESTAMP', description: 'Microsecond timestamp of the event' },
                { name: 'page_location', type: 'STRING', description: 'Full URL of the page' },
                { name: 'page_referrer', type: 'STRING', description: 'Referrer URL' },
                { name: 'device_category', type: 'STRING', description: 'Device type (desktop, mobile, tablet)' },
                { name: 'geo_country', type: 'STRING', description: 'User country based on IP' },
              ]
            },
            {
              id: 'fb-ads-api',
              name: 'Facebook Ads API',
              objType: OBJ_TYPES.API,
              icon: './img/api.svg',
              downstream: ['ad_spend'],
              description: 'Facebook/Meta advertising performance data. Daily aggregated metrics by campaign and ad.',
              owner: 'Marketing Ops',
              createdAt: '2023-07-10',
              dataQuality: 'High',
              tags: ['source', 'advertising', 'marketing', 'meta'],
              columns: [
                { name: 'ad_id', type: 'STRING', description: 'Facebook Ad ID' },
                { name: 'campaign_id', type: 'STRING', description: 'Facebook Campaign ID' },
                { name: 'adset_id', type: 'STRING', description: 'Facebook Ad Set ID' },
                { name: 'spend', type: 'DECIMAL', description: 'Total spend in account currency' },
                { name: 'impressions', type: 'INTEGER', description: 'Number of ad impressions' },
                { name: 'clicks', type: 'INTEGER', description: 'Number of ad clicks' },
                { name: 'conversions', type: 'INTEGER', description: 'Number of attributed conversions' },
                { name: 'date', type: 'DATE', description: 'Reporting date' },
              ]
            },
            {
              id: 'mixpanel-api',
              name: 'Mixpanel Events',
              objType: OBJ_TYPES.API,
              icon: './img/api.svg',
              downstream: ['product_events'],
              description: 'Product analytics events from Mixpanel. Tracks user interactions within the application.',
              owner: 'Product Analytics',
              createdAt: '2023-08-01',
              dataQuality: 'High',
              tags: ['source', 'product-analytics', 'events', 'user-behavior'],
              columns: [
                { name: 'distinct_id', type: 'STRING', description: 'Mixpanel distinct user ID' },
                { name: 'event', type: 'STRING', description: 'Event name (Button Clicked, Feature Used, etc.)' },
                { name: 'time', type: 'TIMESTAMP', description: 'Unix timestamp of the event' },
                { name: 'properties', type: 'JSON', description: 'Event properties as JSON object' },
                { name: 'insert_id', type: 'STRING', description: 'Unique event identifier for deduplication' },
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
                  description: 'Raw orders data loaded from Shopify via Fivetran. Contains all historical orders since 2023.',
                  owner: 'data_engineering',
                  createdAt: '2023-06-16',
                  dataQuality: 'High',
                  tags: ['raw', 'fivetran', 'daily-sync'],
                  rowCount: 2847563,
                  hasError: true,
                  errorMessage: 'Fivetran sync failed: Connection timeout to Shopify API. Last successful sync was 12 hours ago.',
                  columns: [
                    { name: 'ORDER_ID', type: 'VARCHAR', isPrimaryKey: true, description: 'Primary key - Shopify order ID' },
                    { name: 'CUSTOMER_ID', type: 'VARCHAR', isForeignKey: true, description: 'Foreign key to CUSTOMERS table' },
                    { name: 'ORDER_DATE', type: 'TIMESTAMP', description: 'Order creation timestamp (UTC)' },
                    { name: 'TOTAL_AMOUNT', type: 'DECIMAL', description: 'Order total in original currency' },
                    { name: 'CURRENCY', type: 'VARCHAR', description: 'ISO currency code' },
                    { name: 'STATUS', type: 'VARCHAR', description: 'Order fulfillment status' },
                    { name: 'SHIPPING_ADDRESS', type: 'VARIANT', description: 'JSON object with shipping details' },
                    { name: 'LINE_ITEMS', type: 'VARIANT', description: 'Array of order line items' },
                    { name: '_LOADED_AT', type: 'TIMESTAMP', description: 'Fivetran sync timestamp' },
                  ]
                },
                {
                  id: 'payments',
                  name: 'PAYMENTS',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['stg_payments'],
                  description: 'Raw payment transactions from Stripe. Synced every 15 minutes via Fivetran.',
                  owner: 'data_engineering',
                  createdAt: '2023-06-16',
                  dataQuality: 'High',
                  tags: ['raw', 'fivetran', 'near-real-time', 'pci'],
                  rowCount: 3156842,
                  columns: [
                    { name: 'PAYMENT_ID', type: 'VARCHAR', isPrimaryKey: true, description: 'Stripe payment intent ID' },
                    { name: 'ORDER_ID', type: 'VARCHAR', isForeignKey: true, description: 'Associated order ID' },
                    { name: 'AMOUNT', type: 'DECIMAL', description: 'Payment amount in cents' },
                    { name: 'CURRENCY', type: 'VARCHAR', description: 'Payment currency' },
                    { name: 'PAYMENT_METHOD', type: 'VARCHAR', description: 'Payment type (card, ach, etc.)' },
                    { name: 'STATUS', type: 'VARCHAR', description: 'Payment status from Stripe' },
                    { name: 'PROCESSED_AT', type: 'TIMESTAMP', description: 'When payment was processed' },
                    { name: '_LOADED_AT', type: 'TIMESTAMP', description: 'Fivetran sync timestamp' },
                  ]
                },
                {
                  id: 'customers',
                  name: 'CUSTOMERS',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['stg_customers', 'stg_orders'],
                  description: 'Customer master data from Salesforce. Updated daily with full refresh.',
                  owner: 'data_engineering',
                  createdAt: '2023-05-21',
                  dataQuality: 'High',
                  tags: ['raw', 'fivetran', 'master-data', 'pii'],
                  rowCount: 458723,
                  columns: [
                    { name: 'CUSTOMER_ID', type: 'VARCHAR', isPrimaryKey: true, description: 'Salesforce Contact ID' },
                    { name: 'EMAIL', type: 'VARCHAR', description: 'Customer email (PII)' },
                    { name: 'FIRST_NAME', type: 'VARCHAR', description: 'Customer first name (PII)' },
                    { name: 'LAST_NAME', type: 'VARCHAR', description: 'Customer last name (PII)' },
                    { name: 'COMPANY', type: 'VARCHAR', description: 'Company/Organization name' },
                    { name: 'PHONE', type: 'VARCHAR', description: 'Phone number (PII)' },
                    { name: 'ADDRESS', type: 'VARIANT', description: 'Full address as JSON' },
                    { name: 'CREATED_AT', type: 'TIMESTAMP', description: 'Customer creation date' },
                    { name: '_LOADED_AT', type: 'TIMESTAMP', description: 'Fivetran sync timestamp' },
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
                  description: 'Google Analytics 4 session data. Exported daily via BigQuery to Snowflake.',
                  owner: 'marketing_analytics',
                  createdAt: '2023-07-02',
                  dataQuality: 'Medium',
                  tags: ['raw', 'ga4', 'daily-export', 'marketing'],
                  rowCount: 15847293,
                  columns: [
                    { name: 'SESSION_ID', type: 'VARCHAR', isPrimaryKey: true, description: 'Concatenated GA4 session key' },
                    { name: 'CLIENT_ID', type: 'VARCHAR', description: 'GA4 client identifier' },
                    { name: 'USER_ID', type: 'VARCHAR', description: 'Authenticated user ID if available' },
                    { name: 'SESSION_START', type: 'TIMESTAMP', description: 'Session start timestamp' },
                    { name: 'SESSION_END', type: 'TIMESTAMP', description: 'Session end timestamp' },
                    { name: 'PAGE_VIEWS', type: 'INTEGER', description: 'Number of page views in session' },
                    { name: 'LANDING_PAGE', type: 'VARCHAR', description: 'First page URL' },
                    { name: 'EXIT_PAGE', type: 'VARCHAR', description: 'Last page URL' },
                    { name: 'DEVICE_CATEGORY', type: 'VARCHAR', description: 'Device type' },
                    { name: 'COUNTRY', type: 'VARCHAR', description: 'Geo country' },
                    { name: '_LOADED_AT', type: 'TIMESTAMP', description: 'ETL load timestamp' },
                  ]
                },
                {
                  id: 'ga_events',
                  name: 'GA_EVENTS',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['stg_web_events'],
                  description: 'Google Analytics 4 event-level data. Contains all tracked events and parameters.',
                  owner: 'marketing_analytics',
                  createdAt: '2023-07-02',
                  dataQuality: 'Medium',
                  tags: ['raw', 'ga4', 'daily-export', 'events'],
                  rowCount: 89452167,
                  columns: [
                    { name: 'EVENT_ID', type: 'VARCHAR', isPrimaryKey: true, description: 'Unique event identifier' },
                    { name: 'SESSION_ID', type: 'VARCHAR', isForeignKey: true, description: 'Parent session ID' },
                    { name: 'EVENT_NAME', type: 'VARCHAR', description: 'GA4 event name' },
                    { name: 'EVENT_TIMESTAMP', type: 'TIMESTAMP', description: 'Event timestamp (microseconds)' },
                    { name: 'PAGE_LOCATION', type: 'VARCHAR', description: 'Page URL where event occurred' },
                    { name: 'EVENT_PARAMS', type: 'VARIANT', description: 'Event parameters as JSON' },
                    { name: '_LOADED_AT', type: 'TIMESTAMP', description: 'ETL load timestamp' },
                  ]
                },
                {
                  id: 'ad_spend',
                  name: 'AD_SPEND',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['stg_ad_spend'],
                  description: 'Aggregated advertising spend data from Facebook Ads. Daily metrics by campaign.',
                  owner: 'marketing_analytics',
                  createdAt: '2023-07-11',
                  dataQuality: 'High',
                  tags: ['raw', 'fivetran', 'facebook', 'advertising'],
                  rowCount: 284567,
                  columns: [
                    { name: 'AD_ID', type: 'VARCHAR', isPrimaryKey: true, description: 'Facebook Ad ID' },
                    { name: 'CAMPAIGN_ID', type: 'VARCHAR', description: 'Parent campaign ID' },
                    { name: 'CAMPAIGN_NAME', type: 'VARCHAR', description: 'Campaign display name' },
                    { name: 'ADSET_ID', type: 'VARCHAR', description: 'Ad set ID' },
                    { name: 'DATE', type: 'DATE', description: 'Reporting date' },
                    { name: 'SPEND', type: 'DECIMAL', description: 'Daily spend in USD' },
                    { name: 'IMPRESSIONS', type: 'INTEGER', description: 'Daily impressions' },
                    { name: 'CLICKS', type: 'INTEGER', description: 'Daily clicks' },
                    { name: 'CONVERSIONS', type: 'INTEGER', description: 'Daily conversions' },
                    { name: '_LOADED_AT', type: 'TIMESTAMP', description: 'Fivetran sync timestamp' },
                  ]
                },
                {
                  id: 'product_events',
                  name: 'PRODUCT_EVENTS',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['stg_web_events', 'stg_sessions'],
                  description: 'Product analytics events from Mixpanel. Tracks in-app user behavior.',
                  owner: 'product_analytics',
                  createdAt: '2023-08-02',
                  dataQuality: 'High',
                  tags: ['raw', 'mixpanel', 'product', 'events'],
                  rowCount: 45678234,
                  columns: [
                    { name: 'EVENT_ID', type: 'VARCHAR', isPrimaryKey: true, description: 'Unique event ID' },
                    { name: 'USER_ID', type: 'VARCHAR', description: 'Application user ID' },
                    { name: 'EVENT_NAME', type: 'VARCHAR', description: 'Event type name' },
                    { name: 'EVENT_TIME', type: 'TIMESTAMP', description: 'Event timestamp' },
                    { name: 'PROPERTIES', type: 'VARIANT', description: 'Event properties JSON' },
                    { name: 'SESSION_ID', type: 'VARCHAR', description: 'Application session ID' },
                    { name: '_LOADED_AT', type: 'TIMESTAMP', description: 'ETL load timestamp' },
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
                  description: 'Cleaned and standardized orders data. Currency converted to USD, addresses parsed.',
                  owner: 'analytics_engineering',
                  createdAt: '2023-06-20',
                  dataQuality: 'High',
                  tags: ['staging', 'dbt', 'orders', 'tested'],
                  hasWarning: true,
                  warningMessage: 'Data may be stale. Upstream source ORDERS has a sync error.',
                  rowCount: 2847563,
                  columns: [
                    { name: 'ORDER_ID', type: 'VARCHAR', isPrimaryKey: true, description: 'Order unique identifier' },
                    { name: 'CUSTOMER_ID', type: 'VARCHAR', isForeignKey: true, description: 'Customer reference' },
                    { name: 'CUSTOMER_EMAIL', type: 'VARCHAR', description: 'Customer email from join' },
                    { name: 'ORDER_DATE', type: 'DATE', description: 'Order date (date only)' },
                    { name: 'ORDER_TIMESTAMP', type: 'TIMESTAMP', description: 'Full order timestamp' },
                    { name: 'ORDER_AMOUNT_USD', type: 'DECIMAL', description: 'Order amount converted to USD' },
                    { name: 'ORDER_STATUS', type: 'VARCHAR', description: 'Standardized order status' },
                    { name: 'SHIPPING_COUNTRY', type: 'VARCHAR', description: 'Extracted shipping country' },
                    { name: 'SHIPPING_CITY', type: 'VARCHAR', description: 'Extracted shipping city' },
                    { name: 'ITEM_COUNT', type: 'INTEGER', description: 'Number of line items' },
                  ]
                },
                {
                  id: 'stg_payments',
                  name: 'STG_PAYMENTS',
                  objType: OBJ_TYPES.VIEW,
                  icon: './img/ui/view.svg',
                  downstream: ['fct_customer_orders'],
                  description: 'Standardized payment data with amounts in USD and success flags.',
                  owner: 'analytics_engineering',
                  createdAt: '2023-06-20',
                  dataQuality: 'High',
                  tags: ['staging', 'dbt', 'payments', 'tested'],
                  rowCount: 3156842,
                  columns: [
                    { name: 'PAYMENT_ID', type: 'VARCHAR', isPrimaryKey: true, description: 'Payment unique ID' },
                    { name: 'ORDER_ID', type: 'VARCHAR', isForeignKey: true, description: 'Related order ID' },
                    { name: 'PAYMENT_AMOUNT_USD', type: 'DECIMAL', description: 'Payment amount in USD' },
                    { name: 'PAYMENT_METHOD', type: 'VARCHAR', description: 'Standardized payment method' },
                    { name: 'PAYMENT_STATUS', type: 'VARCHAR', description: 'Payment status' },
                    { name: 'PROCESSED_AT', type: 'TIMESTAMP', description: 'Processing timestamp' },
                    { name: 'IS_SUCCESSFUL', type: 'BOOLEAN', description: 'True if payment succeeded' },
                  ]
                },
                {
                  id: 'stg_customers',
                  name: 'STG_CUSTOMERS',
                  objType: OBJ_TYPES.VIEW,
                  icon: './img/ui/view.svg',
                  downstream: ['fct_customer_orders'],
                  description: 'Clean customer dimension with parsed addresses and computed fields.',
                  owner: 'analytics_engineering',
                  createdAt: '2023-05-25',
                  dataQuality: 'High',
                  tags: ['staging', 'dbt', 'customers', 'pii', 'tested'],
                  rowCount: 458723,
                  columns: [
                    { name: 'CUSTOMER_ID', type: 'VARCHAR', isPrimaryKey: true, description: 'Customer unique ID' },
                    { name: 'EMAIL', type: 'VARCHAR', description: 'Customer email address' },
                    { name: 'FULL_NAME', type: 'VARCHAR', description: 'Concatenated full name' },
                    { name: 'FIRST_NAME', type: 'VARCHAR', description: 'First name' },
                    { name: 'LAST_NAME', type: 'VARCHAR', description: 'Last name' },
                    { name: 'COMPANY_NAME', type: 'VARCHAR', description: 'Company/Organization' },
                    { name: 'PHONE_NUMBER', type: 'VARCHAR', description: 'Contact phone' },
                    { name: 'COUNTRY', type: 'VARCHAR', description: 'Country from address' },
                    { name: 'CITY', type: 'VARCHAR', description: 'City from address' },
                    { name: 'CREATED_AT', type: 'TIMESTAMP', description: 'Account creation date' },
                    { name: 'DAYS_SINCE_SIGNUP', type: 'INTEGER', description: 'Days since account created' },
                  ]
                },
                {
                  id: 'stg_sessions',
                  name: 'STG_SESSIONS',
                  objType: OBJ_TYPES.VIEW,
                  icon: './img/ui/view.svg',
                  downstream: ['fct_customer_orders'],
                  description: 'Unified session data from GA4 and Mixpanel with computed metrics.',
                  owner: 'analytics_engineering',
                  createdAt: '2023-07-05',
                  dataQuality: 'Medium',
                  tags: ['staging', 'dbt', 'sessions', 'web-analytics'],
                  rowCount: 18234567,
                  columns: [
                    { name: 'SESSION_ID', type: 'VARCHAR', isPrimaryKey: true, description: 'Unified session ID' },
                    { name: 'USER_ID', type: 'VARCHAR', description: 'Mapped user ID if known' },
                    { name: 'SESSION_DATE', type: 'DATE', description: 'Session date' },
                    { name: 'SESSION_START_TIME', type: 'TIMESTAMP', description: 'Session start' },
                    { name: 'SESSION_DURATION_SECONDS', type: 'INTEGER', description: 'Total session duration' },
                    { name: 'PAGE_VIEWS', type: 'INTEGER', description: 'Pages viewed' },
                    { name: 'LANDING_PAGE_PATH', type: 'VARCHAR', description: 'Entry page path' },
                    { name: 'EXIT_PAGE_PATH', type: 'VARCHAR', description: 'Exit page path' },
                    { name: 'DEVICE_TYPE', type: 'VARCHAR', description: 'Device category' },
                    { name: 'BROWSER', type: 'VARCHAR', description: 'Browser name' },
                    { name: 'COUNTRY', type: 'VARCHAR', description: 'Geo country' },
                    { name: 'IS_BOUNCE', type: 'BOOLEAN', description: 'Single page session' },
                  ]
                },
                {
                  id: 'stg_web_events',
                  name: 'STG_WEB_EVENTS',
                  objType: OBJ_TYPES.VIEW,
                  icon: './img/ui/view.svg',
                  downstream: ['fct_customer_orders'],
                  description: 'Unified event stream from GA4 and Mixpanel with standardized schema.',
                  owner: 'analytics_engineering',
                  createdAt: '2023-07-05',
                  dataQuality: 'Medium',
                  tags: ['staging', 'dbt', 'events', 'unified'],
                  rowCount: 124567890,
                  columns: [
                    { name: 'EVENT_ID', type: 'VARCHAR', isPrimaryKey: true, description: 'Unique event ID' },
                    { name: 'SESSION_ID', type: 'VARCHAR', isForeignKey: true, description: 'Parent session' },
                    { name: 'USER_ID', type: 'VARCHAR', description: 'User identifier' },
                    { name: 'EVENT_NAME', type: 'VARCHAR', description: 'Standardized event name' },
                    { name: 'EVENT_TIMESTAMP', type: 'TIMESTAMP', description: 'Event time' },
                    { name: 'EVENT_DATE', type: 'DATE', description: 'Event date' },
                    { name: 'PAGE_PATH', type: 'VARCHAR', description: 'Page where event occurred' },
                    { name: 'EVENT_PROPERTIES', type: 'VARIANT', description: 'Event properties JSON' },
                    { name: 'IS_CONVERSION', type: 'BOOLEAN', description: 'Is conversion event' },
                  ]
                },
                {
                  id: 'stg_ad_spend',
                  name: 'STG_AD_SPEND',
                  objType: OBJ_TYPES.VIEW,
                  icon: './img/ui/view.svg',
                  downstream: [],
                  description: 'Standardized advertising spend with calculated metrics (CTR, CPC, CPM).',
                  owner: 'marketing_analytics',
                  createdAt: '2023-07-15',
                  dataQuality: 'High',
                  tags: ['staging', 'dbt', 'advertising', 'metrics'],
                  rowCount: 284567,
                  columns: [
                    { name: 'AD_ID', type: 'VARCHAR', isPrimaryKey: true, description: 'Ad unique ID' },
                    { name: 'CAMPAIGN_ID', type: 'VARCHAR', description: 'Campaign ID' },
                    { name: 'CAMPAIGN_NAME', type: 'VARCHAR', description: 'Campaign name' },
                    { name: 'AD_DATE', type: 'DATE', description: 'Reporting date' },
                    { name: 'SPEND_USD', type: 'DECIMAL', description: 'Daily spend in USD' },
                    { name: 'IMPRESSIONS', type: 'INTEGER', description: 'Daily impressions' },
                    { name: 'CLICKS', type: 'INTEGER', description: 'Daily clicks' },
                    { name: 'CONVERSIONS', type: 'INTEGER', description: 'Daily conversions' },
                    { name: 'CTR', type: 'DECIMAL', description: 'Click-through rate' },
                    { name: 'CPC', type: 'DECIMAL', description: 'Cost per click' },
                    { name: 'CPM', type: 'DECIMAL', description: 'Cost per 1000 impressions' },
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
                  description: 'Core fact table joining orders, payments, customers, and attribution data. Primary source for revenue and customer analytics.',
                  owner: 'analytics_engineering',
                  createdAt: '2023-06-25',
                  dataQuality: 'High',
                  tags: ['fact', 'dbt', 'core', 'revenue', 'certified'],
                  hasUpstreamIssues: true,
                  upstreamIssueMessage: 'Upstream data source ORDERS has a sync error. Data in this table may be stale.',
                  rowCount: 2847563,
                  columns: [
                    { name: 'ORDER_KEY', type: 'INTEGER', isPrimaryKey: true, description: 'Surrogate key for the order' },
                    { name: 'ORDER_ID', type: 'VARCHAR', description: 'Natural key from source system' },
                    { name: 'CUSTOMER_KEY', type: 'INTEGER', isForeignKey: true, description: 'FK to dim_customers' },
                    { name: 'CUSTOMER_ID', type: 'VARCHAR', description: 'Natural customer ID' },
                    { name: 'CUSTOMER_EMAIL', type: 'VARCHAR', description: 'Customer email at time of order' },
                    { name: 'CUSTOMER_NAME', type: 'VARCHAR', description: 'Customer full name' },
                    { name: 'ORDER_DATE', type: 'DATE', description: 'Order date for partitioning' },
                    { name: 'ORDER_TIMESTAMP', type: 'TIMESTAMP', description: 'Precise order timestamp' },
                    { name: 'ORDER_AMOUNT', type: 'DECIMAL', description: 'Order total in USD' },
                    { name: 'PAYMENT_AMOUNT', type: 'DECIMAL', description: 'Actual payment collected' },
                    { name: 'PAYMENT_METHOD', type: 'VARCHAR', description: 'Payment method used' },
                    { name: 'ORDER_STATUS', type: 'VARCHAR', description: 'Current order status' },
                    { name: 'PAYMENT_STATUS', type: 'VARCHAR', description: 'Payment status' },
                    { name: 'ITEM_COUNT', type: 'INTEGER', description: 'Number of items ordered' },
                    { name: 'FIRST_ORDER_FLAG', type: 'BOOLEAN', description: 'True if customer first order' },
                    { name: 'DAYS_SINCE_LAST_ORDER', type: 'INTEGER', description: 'Days since previous order' },
                    { name: 'SESSION_ID', type: 'VARCHAR', description: 'Attribution session ID' },
                    { name: 'ATTRIBUTION_CHANNEL', type: 'VARCHAR', description: 'Marketing channel' },
                    { name: 'DEVICE_TYPE', type: 'VARCHAR', description: 'Device used for order' },
                    { name: 'COUNTRY', type: 'VARCHAR', description: 'Shipping country' },
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
                  description: 'Customer dimension with lifetime metrics, segmentation, and RFM scores. Updated daily.',
                  owner: 'analytics_engineering',
                  createdAt: '2023-06-28',
                  dataQuality: 'High',
                  tags: ['dimension', 'dbt', 'customers', 'scd2', 'certified'],
                  rowCount: 458723,
                  columns: [
                    { name: 'CUSTOMER_KEY', type: 'INTEGER', isPrimaryKey: true, description: 'Surrogate key' },
                    { name: 'CUSTOMER_ID', type: 'VARCHAR', description: 'Natural customer ID' },
                    { name: 'EMAIL', type: 'VARCHAR', description: 'Customer email' },
                    { name: 'FULL_NAME', type: 'VARCHAR', description: 'Full name' },
                    { name: 'FIRST_NAME', type: 'VARCHAR', description: 'First name' },
                    { name: 'LAST_NAME', type: 'VARCHAR', description: 'Last name' },
                    { name: 'COMPANY', type: 'VARCHAR', description: 'Company name' },
                    { name: 'COUNTRY', type: 'VARCHAR', description: 'Country' },
                    { name: 'CITY', type: 'VARCHAR', description: 'City' },
                    { name: 'FIRST_ORDER_DATE', type: 'DATE', description: 'First purchase date' },
                    { name: 'MOST_RECENT_ORDER_DATE', type: 'DATE', description: 'Last purchase date' },
                    { name: 'TOTAL_ORDERS', type: 'INTEGER', description: 'Lifetime order count' },
                    { name: 'TOTAL_REVENUE', type: 'DECIMAL', description: 'Lifetime revenue' },
                    { name: 'AVERAGE_ORDER_VALUE', type: 'DECIMAL', description: 'Average order value' },
                    { name: 'CUSTOMER_LIFETIME_DAYS', type: 'INTEGER', description: 'Days as customer' },
                    { name: 'CUSTOMER_SEGMENT', type: 'VARCHAR', description: 'RFM segment (Champion, Loyal, etc.)' },
                    { name: 'IS_ACTIVE', type: 'BOOLEAN', description: 'Active in last 90 days' },
                  ]
                },
                {
                  id: 'fct_daily_revenue',
                  name: 'FCT_DAILY_REVENUE',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['exec-revenue-dashboard'],
                  description: 'Daily aggregated revenue metrics. Primary source for executive dashboards.',
                  owner: 'analytics_engineering',
                  createdAt: '2023-07-01',
                  dataQuality: 'High',
                  tags: ['fact', 'dbt', 'revenue', 'aggregated', 'certified'],
                  rowCount: 945,
                  columns: [
                    { name: 'DATE_KEY', type: 'INTEGER', isPrimaryKey: true, description: 'Date key (YYYYMMDD)' },
                    { name: 'REVENUE_DATE', type: 'DATE', description: 'Revenue date' },
                    { name: 'TOTAL_REVENUE', type: 'DECIMAL', description: 'Daily gross revenue' },
                    { name: 'ORDER_COUNT', type: 'INTEGER', description: 'Orders placed' },
                    { name: 'UNIQUE_CUSTOMERS', type: 'INTEGER', description: 'Unique customers' },
                    { name: 'NEW_CUSTOMERS', type: 'INTEGER', description: 'First-time buyers' },
                    { name: 'RETURNING_CUSTOMERS', type: 'INTEGER', description: 'Repeat buyers' },
                    { name: 'AVERAGE_ORDER_VALUE', type: 'DECIMAL', description: 'Daily AOV' },
                    { name: 'REFUND_AMOUNT', type: 'DECIMAL', description: 'Refunds issued' },
                    { name: 'NET_REVENUE', type: 'DECIMAL', description: 'Revenue minus refunds' },
                    { name: 'REVENUE_GROWTH_PCT', type: 'DECIMAL', description: 'DoD growth %' },
                  ]
                },
                {
                  id: 'fct_attribution',
                  name: 'FCT_ATTRIBUTION',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: ['marketing-roi-dashboard', 'attribution_model'],
                  description: 'Marketing attribution fact table with multi-touch attribution data.',
                  owner: 'marketing_analytics',
                  createdAt: '2023-07-10',
                  dataQuality: 'Medium',
                  tags: ['fact', 'dbt', 'attribution', 'marketing'],
                  rowCount: 2847563,
                  columns: [
                    { name: 'ATTRIBUTION_KEY', type: 'INTEGER', isPrimaryKey: true, description: 'Surrogate key' },
                    { name: 'ORDER_ID', type: 'VARCHAR', isForeignKey: true, description: 'Related order' },
                    { name: 'CUSTOMER_ID', type: 'VARCHAR', description: 'Customer ID' },
                    { name: 'ATTRIBUTION_DATE', type: 'DATE', description: 'Attribution date' },
                    { name: 'CHANNEL', type: 'VARCHAR', description: 'Marketing channel' },
                    { name: 'CAMPAIGN_ID', type: 'VARCHAR', description: 'Campaign ID' },
                    { name: 'CAMPAIGN_NAME', type: 'VARCHAR', description: 'Campaign name' },
                    { name: 'TOUCHPOINT_COUNT', type: 'INTEGER', description: 'Touchpoints in journey' },
                    { name: 'FIRST_TOUCH_CHANNEL', type: 'VARCHAR', description: 'First touch channel' },
                    { name: 'LAST_TOUCH_CHANNEL', type: 'VARCHAR', description: 'Last touch channel' },
                    { name: 'ATTRIBUTED_REVENUE', type: 'DECIMAL', description: 'Attributed revenue' },
                    { name: 'ATTRIBUTION_MODEL', type: 'VARCHAR', description: 'Model type (linear, first, last)' },
                  ]
                },
                {
                  id: 'user_journey_agg',
                  name: 'USER_JOURNEY_AGG',
                  objType: OBJ_TYPES.TABLE,
                  icon: './img/ui/table.svg',
                  downstream: [],
                  description: 'Aggregated user journey metrics for funnel analysis and conversion optimization.',
                  owner: 'product_analytics',
                  createdAt: '2023-08-15',
                  dataQuality: 'Medium',
                  tags: ['fact', 'dbt', 'journeys', 'product'],
                  rowCount: 1234567,
                  columns: [
                    { name: 'JOURNEY_KEY', type: 'INTEGER', isPrimaryKey: true, description: 'Journey surrogate key' },
                    { name: 'USER_ID', type: 'VARCHAR', description: 'User identifier' },
                    { name: 'JOURNEY_DATE', type: 'DATE', description: 'Journey date' },
                    { name: 'TOTAL_SESSIONS', type: 'INTEGER', description: 'Sessions in journey' },
                    { name: 'TOTAL_PAGE_VIEWS', type: 'INTEGER', description: 'Total page views' },
                    { name: 'TOTAL_EVENTS', type: 'INTEGER', description: 'Total events' },
                    { name: 'CONVERSION_COUNT', type: 'INTEGER', description: 'Conversions' },
                    { name: 'DAYS_TO_CONVERT', type: 'INTEGER', description: 'Days from first visit' },
                    { name: 'JOURNEY_STAGE', type: 'VARCHAR', description: 'Current funnel stage' },
                    { name: 'PRIMARY_DEVICE', type: 'VARCHAR', description: 'Most used device' },
                    { name: 'PRIMARY_CHANNEL', type: 'VARCHAR', description: 'Primary acquisition channel' },
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
              description: 'Executive dashboard showing daily revenue, trends, and KPIs. Refreshed every 4 hours.',
              owner: 'Business Intelligence',
              createdAt: '2023-07-15',
              dataQuality: 'High',
              tags: ['dashboard', 'executive', 'revenue', 'certified'],
              columns: [
                { name: 'Daily Revenue', type: 'MEASURE', description: 'Sum of daily revenue' },
                { name: 'Revenue Trend', type: 'MEASURE', description: '7-day moving average' },
                { name: 'Order Count', type: 'MEASURE', description: 'Daily order count' },
                { name: 'AOV', type: 'MEASURE', description: 'Average order value' },
                { name: 'Customer Count', type: 'MEASURE', description: 'Unique customers' },
                { name: 'Date', type: 'DIMENSION', description: 'Report date' },
                { name: 'Region', type: 'DIMENSION', description: 'Geographic region' },
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
              description: 'Complete customer view with segmentation, lifetime value, and engagement metrics.',
              owner: 'Customer Success',
              createdAt: '2023-08-01',
              dataQuality: 'High',
              tags: ['dashboard', 'customers', 'looker', 'certified'],
              columns: [
                { name: 'Customer Segments', type: 'DIMENSION', description: 'RFM segment breakdown' },
                { name: 'Lifetime Value', type: 'MEASURE', description: 'Customer LTV' },
                { name: 'Total Orders', type: 'MEASURE', description: 'Order count' },
                { name: 'Avg Order Value', type: 'MEASURE', description: 'Average order value' },
                { name: 'Churn Risk', type: 'MEASURE', description: 'Churn probability score' },
                { name: 'Customer Since', type: 'DIMENSION', description: 'Customer tenure' },
                { name: 'Country', type: 'DIMENSION', description: 'Customer country' },
              ]
            },
            {
              id: 'marketing-roi-dashboard',
              name: 'Marketing ROI Dashboard',
              objType: OBJ_TYPES.DASHBOARD,
              icon: './img/ui/dashboards.svg',
              downstream: [],
              description: 'Marketing performance dashboard with ROAS, CAC, and channel attribution.',
              owner: 'Marketing Analytics',
              createdAt: '2023-08-10',
              dataQuality: 'Medium',
              tags: ['dashboard', 'marketing', 'attribution', 'looker'],
              columns: [
                { name: 'Channel', type: 'DIMENSION', description: 'Marketing channel' },
                { name: 'Campaign', type: 'DIMENSION', description: 'Campaign name' },
                { name: 'Spend', type: 'MEASURE', description: 'Total spend' },
                { name: 'Revenue', type: 'MEASURE', description: 'Attributed revenue' },
                { name: 'ROAS', type: 'MEASURE', description: 'Return on ad spend' },
                { name: 'Conversions', type: 'MEASURE', description: 'Conversion count' },
                { name: 'CPA', type: 'MEASURE', description: 'Cost per acquisition' },
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
              description: 'XGBoost model predicting customer churn probability. Retrained weekly, AUC: 0.87.',
              owner: 'Data Science',
              createdAt: '2023-09-01',
              dataQuality: 'High',
              tags: ['ml', 'xgboost', 'churn', 'production'],
              features: [
                { name: 'days_since_last_order', type: 'NUMERIC', importance: 0.23, description: 'Recency feature' },
                { name: 'total_orders', type: 'NUMERIC', importance: 0.18, description: 'Frequency feature' },
                { name: 'average_order_value', type: 'NUMERIC', importance: 0.15, description: 'Monetary feature' },
                { name: 'customer_lifetime_days', type: 'NUMERIC', importance: 0.12, description: 'Customer tenure' },
                { name: 'total_revenue', type: 'NUMERIC', importance: 0.11, description: 'Total spend' },
                { name: 'order_frequency', type: 'NUMERIC', importance: 0.09, description: 'Orders per month' },
                { name: 'country', type: 'CATEGORICAL', importance: 0.07, description: 'Geographic feature' },
                { name: 'customer_segment', type: 'CATEGORICAL', importance: 0.05, description: 'RFM segment' },
              ],
              outputs: [
                { name: 'churn_probability', type: 'NUMERIC', description: 'Probability of churn (0-1)' },
                { name: 'churn_risk_tier', type: 'CATEGORICAL', description: 'High/Medium/Low risk' },
                { name: 'days_to_churn', type: 'NUMERIC', description: 'Predicted days until churn' },
              ]
            },
            {
              id: 'attribution_model',
              name: 'Attribution Model',
              objType: OBJ_TYPES.MODEL,
              icon: './img/model.svg',
              downstream: [],
              description: 'Multi-touch attribution model using Shapley values for fair credit assignment.',
              owner: 'Data Science',
              createdAt: '2023-09-15',
              dataQuality: 'Medium',
              tags: ['ml', 'attribution', 'shapley', 'production'],
              features: [
                { name: 'channel', type: 'CATEGORICAL', importance: 0.25, description: 'Marketing channel' },
                { name: 'touchpoint_sequence', type: 'SEQUENCE', importance: 0.20, description: 'Journey sequence' },
                { name: 'time_to_conversion', type: 'NUMERIC', importance: 0.18, description: 'Time from first touch' },
                { name: 'touchpoint_count', type: 'NUMERIC', importance: 0.15, description: 'Number of touchpoints' },
                { name: 'campaign_type', type: 'CATEGORICAL', importance: 0.12, description: 'Campaign category' },
                { name: 'device_type', type: 'CATEGORICAL', importance: 0.10, description: 'Device used' },
              ],
              outputs: [
                { name: 'channel_attribution_weight', type: 'NUMERIC', description: 'Channel credit weight' },
                { name: 'attributed_revenue', type: 'NUMERIC', description: 'Revenue attributed' },
                { name: 'model_confidence', type: 'NUMERIC', description: 'Confidence score' },
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
              description: 'Automated weekly financial report sent to Finance team via email every Monday.',
              owner: 'Finance',
              createdAt: '2023-08-01',
              dataQuality: 'High',
              tags: ['export', 'scheduled', 'finance', 'email'],
              columns: [
                { name: 'Report Date', type: 'DATE', description: 'Report generation date' },
                { name: 'Weekly Revenue', type: 'DECIMAL', description: 'Total weekly revenue' },
                { name: 'WoW Growth', type: 'DECIMAL', description: 'Week-over-week growth %' },
                { name: 'Order Summary', type: 'JSON', description: 'Order metrics JSON' },
              ]
            },
            {
              id: 'investor-data-room',
              name: 'Investor Data Room',
              objType: OBJ_TYPES.EXTERNAL,
              icon: './img/api.svg',
              downstream: [],
              description: 'Monthly investor metrics exported to secure data room for board reporting.',
              owner: 'Finance',
              createdAt: '2023-09-01',
              dataQuality: 'High',
              tags: ['export', 'monthly', 'investors', 'confidential'],
              columns: [
                { name: 'Report Period', type: 'DATE', description: 'Reporting period' },
                { name: 'ARR', type: 'DECIMAL', description: 'Annual recurring revenue' },
                { name: 'Customer Count', type: 'INTEGER', description: 'Total customers' },
                { name: 'Retention Rate', type: 'DECIMAL', description: 'Customer retention %' },
                { name: 'Growth Metrics', type: 'JSON', description: 'Growth KPIs JSON' },
              ]
            },
          ]
        }
      ]
    }
  ]
};

// =============================================
// Object-Level Edge Metadata
// Maps source -> target with execution details
// =============================================
const objectEdges = [
  // =========================================
  // API → Raw (Fivetran Syncs)
  // =========================================
  {
    id: 'edge-shopify-orders',
    source: 'shopify-api',
    target: 'orders',
    externalTool: EXTERNAL_TOOLS.FIVETRAN,
    queryType: 'SYNC',
    runBy: 'fivetran_service_account',
    runOn: '2026-02-02 06:00:00',
    duration: '3m 24s',
    queryId: 'sync_shopify_20260202_060000',
    rowCount: 15234,
    sqlQuery: `-- Fivetran Connector: Shopify
-- Sync Type: Incremental
-- Last successful sync

MERGE INTO ACME_PROD.RAW_ECOMMERCE.ORDERS AS target
USING (
  SELECT * FROM FIVETRAN_STAGING.SHOPIFY.ORDERS
  WHERE _fivetran_synced > '2026-02-01'
) AS source
ON target.ORDER_ID = source.order_id
WHEN MATCHED THEN UPDATE SET ...
WHEN NOT MATCHED THEN INSERT ...;`
  },
  {
    id: 'edge-stripe-payments',
    source: 'stripe-api',
    target: 'payments',
    externalTool: EXTERNAL_TOOLS.FIVETRAN,
    queryType: 'SYNC',
    runBy: 'fivetran_service_account',
    runOn: '2026-02-02 05:45:00',
    duration: '2m 18s',
    queryId: 'sync_stripe_20260202_054500',
    rowCount: 8456,
    sqlQuery: `-- Fivetran Connector: Stripe
-- Sync Type: Incremental (15 min)

MERGE INTO ACME_PROD.RAW_ECOMMERCE.PAYMENTS AS target
USING FIVETRAN_STAGING.STRIPE.PAYMENT_INTENTS AS source
ON target.PAYMENT_ID = source.id
WHEN MATCHED THEN UPDATE SET ...
WHEN NOT MATCHED THEN INSERT ...;`
  },
  {
    id: 'edge-salesforce-customers',
    source: 'salesforce-api',
    target: 'customers',
    externalTool: EXTERNAL_TOOLS.FIVETRAN,
    queryType: 'SYNC',
    runBy: 'fivetran_service_account',
    runOn: '2026-02-02 04:00:00',
    duration: '8m 45s',
    queryId: 'sync_salesforce_20260202_040000',
    rowCount: 2341,
    sqlQuery: `-- Fivetran Connector: Salesforce
-- Sync Type: Full Refresh (Daily)

TRUNCATE TABLE ACME_PROD.RAW_ECOMMERCE.CUSTOMERS;

INSERT INTO ACME_PROD.RAW_ECOMMERCE.CUSTOMERS
SELECT 
  Id AS CUSTOMER_ID,
  Email AS EMAIL,
  FirstName AS FIRST_NAME,
  LastName AS LAST_NAME,
  Account.Name AS COMPANY,
  Phone AS PHONE,
  MailingAddress AS ADDRESS,
  CreatedDate AS CREATED_AT,
  CURRENT_TIMESTAMP() AS _LOADED_AT
FROM FIVETRAN_STAGING.SALESFORCE.CONTACT;`
  },
  {
    id: 'edge-ga4-sessions',
    source: 'ga4-api',
    target: 'ga_sessions',
    queryType: 'EXPORT',
    runBy: 'bigquery_scheduler',
    runOn: '2026-02-02 03:00:00',
    duration: '12m 30s',
    queryId: 'bq_export_ga4_sessions_20260202',
    rowCount: 234567,
    sqlQuery: `-- BigQuery Export to Snowflake
-- Schedule: Daily 3:00 AM UTC

CREATE OR REPLACE TABLE ACME_PROD.RAW_MARKETING.GA_SESSIONS AS
SELECT
  CONCAT(user_pseudo_id, '.', ga_session_id) AS SESSION_ID,
  user_pseudo_id AS CLIENT_ID,
  user_id AS USER_ID,
  TIMESTAMP_MICROS(MIN(event_timestamp)) AS SESSION_START,
  TIMESTAMP_MICROS(MAX(event_timestamp)) AS SESSION_END,
  COUNT(CASE WHEN event_name = 'page_view' THEN 1 END) AS PAGE_VIEWS,
  -- ... more transformations
FROM \`analytics_12345.events_*\`
WHERE _TABLE_SUFFIX = FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY))
GROUP BY 1, 2, 3;`
  },
  {
    id: 'edge-ga4-events',
    source: 'ga4-api',
    target: 'ga_events',
    queryType: 'EXPORT',
    runBy: 'bigquery_scheduler',
    runOn: '2026-02-02 03:15:00',
    duration: '18m 45s',
    queryId: 'bq_export_ga4_events_20260202',
    rowCount: 1567890,
    sqlQuery: `-- BigQuery Export to Snowflake
-- Schedule: Daily 3:15 AM UTC

INSERT INTO ACME_PROD.RAW_MARKETING.GA_EVENTS
SELECT
  GENERATE_UUID() AS EVENT_ID,
  CONCAT(user_pseudo_id, '.', ga_session_id) AS SESSION_ID,
  event_name AS EVENT_NAME,
  TIMESTAMP_MICROS(event_timestamp) AS EVENT_TIMESTAMP,
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location') AS PAGE_LOCATION,
  TO_JSON(event_params) AS EVENT_PARAMS,
  CURRENT_TIMESTAMP() AS _LOADED_AT
FROM \`analytics_12345.events_*\`
WHERE _TABLE_SUFFIX = FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY));`
  },
  {
    id: 'edge-fbads-adspend',
    source: 'fb-ads-api',
    target: 'ad_spend',
    externalTool: EXTERNAL_TOOLS.FIVETRAN,
    queryType: 'SYNC',
    runBy: 'fivetran_service_account',
    runOn: '2026-02-02 05:00:00',
    duration: '1m 45s',
    queryId: 'sync_facebook_20260202_050000',
    rowCount: 456,
    sqlQuery: `-- Fivetran Connector: Facebook Ads
-- Sync Type: Incremental

MERGE INTO ACME_PROD.RAW_MARKETING.AD_SPEND AS target
USING FIVETRAN_STAGING.FACEBOOK_ADS.BASIC_AD AS source
ON target.AD_ID = source.ad_id AND target.DATE = source.date_start
WHEN MATCHED THEN UPDATE SET ...
WHEN NOT MATCHED THEN INSERT ...;`
  },
  {
    id: 'edge-mixpanel-events',
    source: 'mixpanel-api',
    target: 'product_events',
    externalTool: EXTERNAL_TOOLS.STITCH,
    queryType: 'SYNC',
    runBy: 'stitch_service_account',
    runOn: '2026-02-02 06:30:00',
    duration: '5m 12s',
    queryId: 'stitch_mixpanel_20260202_063000',
    rowCount: 89234,
    sqlQuery: `-- Stitch Data Connector: Mixpanel
-- Sync Type: Incremental (Hourly)

INSERT INTO ACME_PROD.RAW_MARKETING.PRODUCT_EVENTS
SELECT
  $insert_id AS EVENT_ID,
  $distinct_id AS USER_ID,
  event AS EVENT_NAME,
  TO_TIMESTAMP(time) AS EVENT_TIME,
  properties AS PROPERTIES,
  properties:$session_id::STRING AS SESSION_ID,
  CURRENT_TIMESTAMP() AS _LOADED_AT
FROM STITCH_STAGING.MIXPANEL.EXPORT
WHERE time > (SELECT MAX(EVENT_TIME) FROM ACME_PROD.RAW_MARKETING.PRODUCT_EVENTS);`
  },

  // =========================================
  // Raw → Staging (dbt transformations)
  // =========================================
  {
    id: 'edge-orders-stg',
    source: 'orders',
    target: 'stg_orders',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'CREATE VIEW',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:00:00',
    duration: '8s',
    queryId: 'dbt_run_20260202_070000_stg_orders',
    rowCount: 2847563,
    sqlQuery: `-- dbt model: stg_orders
-- Materialized: view

CREATE OR REPLACE VIEW ACME_PROD.STAGING.STG_ORDERS AS
SELECT
  ORDER_ID,
  CUSTOMER_ID,
  c.EMAIL AS CUSTOMER_EMAIL,
  DATE(ORDER_DATE) AS ORDER_DATE,
  ORDER_DATE AS ORDER_TIMESTAMP,
  CASE 
    WHEN CURRENCY = 'USD' THEN TOTAL_AMOUNT
    ELSE TOTAL_AMOUNT * fx.RATE 
  END AS ORDER_AMOUNT_USD,
  UPPER(STATUS) AS ORDER_STATUS,
  SHIPPING_ADDRESS:country::STRING AS SHIPPING_COUNTRY,
  SHIPPING_ADDRESS:city::STRING AS SHIPPING_CITY,
  ARRAY_SIZE(LINE_ITEMS) AS ITEM_COUNT
FROM ACME_PROD.RAW_ECOMMERCE.ORDERS o
LEFT JOIN ACME_PROD.RAW_ECOMMERCE.CUSTOMERS c USING (CUSTOMER_ID)
LEFT JOIN ACME_PROD.STAGING.FX_RATES fx ON o.CURRENCY = fx.CURRENCY;`,
    tasks: [
      {
        name: 'dbt_staging_models',
        type: 'dbt Cloud Job',
        schedule: 'Every hour',
        lastRun: '2026-02-02 07:00:00',
        status: 'success',
        owner: 'Data Engineering'
      }
    ]
  },
  {
    id: 'edge-payments-stg',
    source: 'payments',
    target: 'stg_payments',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'CREATE VIEW',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:00:00',
    duration: '5s',
    queryId: 'dbt_run_20260202_070000_stg_payments',
    rowCount: 3156842,
    sqlQuery: `-- dbt model: stg_payments
-- Materialized: view

CREATE OR REPLACE VIEW ACME_PROD.STAGING.STG_PAYMENTS AS
SELECT
  PAYMENT_ID,
  ORDER_ID,
  AMOUNT / 100.0 AS PAYMENT_AMOUNT_USD,  -- Convert cents to dollars
  UPPER(PAYMENT_METHOD) AS PAYMENT_METHOD,
  UPPER(STATUS) AS PAYMENT_STATUS,
  PROCESSED_AT,
  CASE WHEN STATUS = 'succeeded' THEN TRUE ELSE FALSE END AS IS_SUCCESSFUL
FROM ACME_PROD.RAW_ECOMMERCE.PAYMENTS;`
  },
  {
    id: 'edge-customers-stg',
    source: 'customers',
    target: 'stg_customers',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'CREATE VIEW',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:00:00',
    duration: '6s',
    queryId: 'dbt_run_20260202_070000_stg_customers',
    rowCount: 458723,
    sqlQuery: `-- dbt model: stg_customers
-- Materialized: view

CREATE OR REPLACE VIEW ACME_PROD.STAGING.STG_CUSTOMERS AS
SELECT
  CUSTOMER_ID,
  LOWER(EMAIL) AS EMAIL,
  CONCAT(FIRST_NAME, ' ', LAST_NAME) AS FULL_NAME,
  FIRST_NAME,
  LAST_NAME,
  COMPANY AS COMPANY_NAME,
  PHONE AS PHONE_NUMBER,
  ADDRESS:country::STRING AS COUNTRY,
  ADDRESS:city::STRING AS CITY,
  CREATED_AT,
  DATEDIFF('day', CREATED_AT, CURRENT_DATE()) AS DAYS_SINCE_SIGNUP
FROM ACME_PROD.RAW_ECOMMERCE.CUSTOMERS;`
  },
  {
    id: 'edge-gasessions-stg',
    source: 'ga_sessions',
    target: 'stg_sessions',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'CREATE VIEW',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:00:00',
    duration: '12s',
    queryId: 'dbt_run_20260202_070000_stg_sessions',
    rowCount: 15847293,
    sqlQuery: `-- dbt model: stg_sessions
-- Materialized: view

CREATE OR REPLACE VIEW ACME_PROD.STAGING.STG_SESSIONS AS
SELECT
  SESSION_ID,
  COALESCE(USER_ID, CLIENT_ID) AS USER_ID,
  DATE(SESSION_START) AS SESSION_DATE,
  SESSION_START AS SESSION_START_TIME,
  DATEDIFF('second', SESSION_START, SESSION_END) AS SESSION_DURATION_SECONDS,
  PAGE_VIEWS,
  REGEXP_REPLACE(LANDING_PAGE, 'https?://[^/]+', '') AS LANDING_PAGE_PATH,
  REGEXP_REPLACE(EXIT_PAGE, 'https?://[^/]+', '') AS EXIT_PAGE_PATH,
  DEVICE_CATEGORY AS DEVICE_TYPE,
  -- Browser extracted from user agent
  COUNTRY,
  CASE WHEN PAGE_VIEWS = 1 THEN TRUE ELSE FALSE END AS IS_BOUNCE
FROM ACME_PROD.RAW_MARKETING.GA_SESSIONS;`
  },
  {
    id: 'edge-gaevents-stg',
    source: 'ga_events',
    target: 'stg_web_events',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'CREATE VIEW',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:00:00',
    duration: '15s',
    queryId: 'dbt_run_20260202_070000_stg_web_events',
    rowCount: 89452167,
    sqlQuery: `-- dbt model: stg_web_events
-- Materialized: view
-- Sources: GA4 events + Mixpanel events

CREATE OR REPLACE VIEW ACME_PROD.STAGING.STG_WEB_EVENTS AS
SELECT
  EVENT_ID,
  SESSION_ID,
  NULL AS USER_ID,
  EVENT_NAME,
  EVENT_TIMESTAMP,
  DATE(EVENT_TIMESTAMP) AS EVENT_DATE,
  REGEXP_REPLACE(PAGE_LOCATION, 'https?://[^/]+', '') AS PAGE_PATH,
  EVENT_PARAMS AS EVENT_PROPERTIES,
  EVENT_NAME IN ('purchase', 'sign_up', 'lead') AS IS_CONVERSION
FROM ACME_PROD.RAW_MARKETING.GA_EVENTS

UNION ALL

SELECT
  EVENT_ID,
  SESSION_ID,
  USER_ID,
  EVENT_NAME,
  EVENT_TIME AS EVENT_TIMESTAMP,
  DATE(EVENT_TIME) AS EVENT_DATE,
  PROPERTIES:page_path::STRING AS PAGE_PATH,
  PROPERTIES AS EVENT_PROPERTIES,
  EVENT_NAME IN ('Purchase', 'SignUp', 'Lead') AS IS_CONVERSION
FROM ACME_PROD.RAW_MARKETING.PRODUCT_EVENTS;`
  },
  {
    id: 'edge-productevents-stg',
    source: 'product_events',
    target: 'stg_web_events',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'CREATE VIEW',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:00:00',
    duration: '15s',
    queryId: 'dbt_run_20260202_070000_stg_web_events',
    rowCount: 89452167,
    sqlQuery: `-- dbt model: stg_web_events (union source)
-- See full query in ga_events → stg_web_events edge`
  },
  {
    id: 'edge-productevents-sessions',
    source: 'product_events',
    target: 'stg_sessions',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'CREATE VIEW',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:00:00',
    duration: '12s',
    queryId: 'dbt_run_20260202_070000_stg_sessions',
    rowCount: 18234567,
    sqlQuery: `-- dbt model: stg_sessions (union source)
-- Mixpanel sessions merged with GA4 sessions`
  },
  {
    id: 'edge-adspend-stg',
    source: 'ad_spend',
    target: 'stg_ad_spend',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'CREATE VIEW',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:00:00',
    duration: '4s',
    queryId: 'dbt_run_20260202_070000_stg_ad_spend',
    rowCount: 284567,
    sqlQuery: `-- dbt model: stg_ad_spend
-- Materialized: view

CREATE OR REPLACE VIEW ACME_PROD.STAGING.STG_AD_SPEND AS
SELECT
  AD_ID,
  CAMPAIGN_ID,
  CAMPAIGN_NAME,
  DATE AS AD_DATE,
  SPEND AS SPEND_USD,
  IMPRESSIONS,
  CLICKS,
  CONVERSIONS,
  ROUND(CLICKS / NULLIF(IMPRESSIONS, 0) * 100, 2) AS CTR,
  ROUND(SPEND / NULLIF(CLICKS, 0), 2) AS CPC,
  ROUND(SPEND / NULLIF(IMPRESSIONS, 0) * 1000, 2) AS CPM
FROM ACME_PROD.RAW_MARKETING.AD_SPEND;`
  },
  {
    id: 'edge-customers-stg-orders',
    source: 'customers',
    target: 'stg_orders',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'JOIN',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:00:00',
    duration: '8s',
    queryId: 'dbt_run_20260202_070000_stg_orders',
    rowCount: 2847563,
    sqlQuery: `-- Join reference in stg_orders
-- Customers joined to get CUSTOMER_EMAIL

LEFT JOIN ACME_PROD.RAW_ECOMMERCE.CUSTOMERS c 
  ON o.CUSTOMER_ID = c.CUSTOMER_ID`
  },

  // =========================================
  // Staging → Fact (dbt transformations)
  // =========================================
  {
    id: 'edge-stgorders-fct',
    source: 'stg_orders',
    target: 'fct_customer_orders',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'CREATE TABLE',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:05:00',
    duration: '45s',
    queryId: 'dbt_run_20260202_070500_fct_customer_orders',
    rowCount: 2847563,
    storedProcedures: [
      {
        name: 'SP_VALIDATE_ORDER_DATA',
        schema: 'ACME_PROD.ANALYTICS',
        lastModified: '2026-01-15',
        owner: 'Data Engineering',
        status: 'success'
      },
      {
        name: 'SP_CALCULATE_ORDER_METRICS',
        schema: 'ACME_PROD.ANALYTICS',
        lastModified: '2026-01-20',
        owner: 'Analytics Team',
        status: 'success'
      }
    ],
    tasks: [
      {
        name: 'dbt_fact_models',
        type: 'dbt Cloud Job',
        schedule: 'Daily at 7:05 AM UTC',
        lastRun: '2026-02-02 07:05:00',
        status: 'success',
        owner: 'Data Engineering'
      },
      {
        name: 'TASK_REFRESH_FCT_ORDERS',
        type: 'Snowflake Task',
        schedule: 'AFTER TASK_STG_COMPLETE',
        lastRun: '2026-02-02 07:04:45',
        status: 'success',
        owner: 'Snowflake Admin'
      }
    ],
    sqlQuery: `-- dbt model: fct_customer_orders
-- Materialized: table (incremental)

CREATE OR REPLACE TABLE ANALYTICS_DB.ANALYTICS.FCT_CUSTOMER_ORDERS AS
WITH orders AS (
  SELECT * FROM ACME_PROD.STAGING.STG_ORDERS
),
payments AS (
  SELECT * FROM ACME_PROD.STAGING.STG_PAYMENTS
),
customers AS (
  SELECT * FROM ACME_PROD.STAGING.STG_CUSTOMERS
),
sessions AS (
  SELECT * FROM ACME_PROD.STAGING.STG_SESSIONS
),
events AS (
  SELECT * FROM ACME_PROD.STAGING.STG_WEB_EVENTS
  WHERE IS_CONVERSION = TRUE
)
SELECT
  ROW_NUMBER() OVER (ORDER BY o.ORDER_ID) AS ORDER_KEY,
  o.ORDER_ID,
  HASH(o.CUSTOMER_ID) AS CUSTOMER_KEY,
  o.CUSTOMER_ID,
  o.CUSTOMER_EMAIL,
  c.FULL_NAME AS CUSTOMER_NAME,
  o.ORDER_DATE,
  o.ORDER_TIMESTAMP,
  o.ORDER_AMOUNT_USD AS ORDER_AMOUNT,
  p.PAYMENT_AMOUNT_USD AS PAYMENT_AMOUNT,
  p.PAYMENT_METHOD,
  o.ORDER_STATUS,
  p.PAYMENT_STATUS,
  o.ITEM_COUNT,
  CASE WHEN first_orders.CUSTOMER_ID IS NOT NULL THEN TRUE ELSE FALSE END AS FIRST_ORDER_FLAG,
  DATEDIFF('day', LAG(o.ORDER_DATE) OVER (PARTITION BY o.CUSTOMER_ID ORDER BY o.ORDER_DATE), o.ORDER_DATE) AS DAYS_SINCE_LAST_ORDER,
  s.SESSION_ID,
  e.EVENT_PROPERTIES:utm_source::STRING AS ATTRIBUTION_CHANNEL,
  s.DEVICE_TYPE,
  o.SHIPPING_COUNTRY AS COUNTRY
FROM orders o
LEFT JOIN payments p ON o.ORDER_ID = p.ORDER_ID
LEFT JOIN customers c ON o.CUSTOMER_ID = c.CUSTOMER_ID
LEFT JOIN sessions s ON ... -- session matching logic
LEFT JOIN events e ON ... -- conversion event matching
LEFT JOIN (SELECT CUSTOMER_ID, MIN(ORDER_DATE) AS FIRST_DATE FROM orders GROUP BY 1) first_orders
  ON o.CUSTOMER_ID = first_orders.CUSTOMER_ID AND o.ORDER_DATE = first_orders.FIRST_DATE;`
  },
  {
    id: 'edge-stgpayments-fct',
    source: 'stg_payments',
    target: 'fct_customer_orders',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'JOIN',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:05:00',
    duration: '45s',
    queryId: 'dbt_run_20260202_070500_fct_customer_orders',
    rowCount: 2847563,
    sqlQuery: `-- Join: stg_payments → fct_customer_orders
LEFT JOIN ACME_PROD.STAGING.STG_PAYMENTS p 
  ON o.ORDER_ID = p.ORDER_ID`
  },
  {
    id: 'edge-stgcustomers-fct',
    source: 'stg_customers',
    target: 'fct_customer_orders',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'JOIN',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:05:00',
    duration: '45s',
    queryId: 'dbt_run_20260202_070500_fct_customer_orders',
    rowCount: 2847563,
    sqlQuery: `-- Join: stg_customers → fct_customer_orders
LEFT JOIN ACME_PROD.STAGING.STG_CUSTOMERS c 
  ON o.CUSTOMER_ID = c.CUSTOMER_ID`
  },
  {
    id: 'edge-stgsessions-fct',
    source: 'stg_sessions',
    target: 'fct_customer_orders',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'JOIN',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:05:00',
    duration: '45s',
    queryId: 'dbt_run_20260202_070500_fct_customer_orders',
    rowCount: 2847563,
    sqlQuery: `-- Join: stg_sessions → fct_customer_orders
LEFT JOIN ACME_PROD.STAGING.STG_SESSIONS s 
  ON ... -- session attribution logic`
  },
  {
    id: 'edge-stgevents-fct',
    source: 'stg_web_events',
    target: 'fct_customer_orders',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'JOIN',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:05:00',
    duration: '45s',
    queryId: 'dbt_run_20260202_070500_fct_customer_orders',
    rowCount: 2847563,
    sqlQuery: `-- Join: stg_web_events → fct_customer_orders
LEFT JOIN ACME_PROD.STAGING.STG_WEB_EVENTS e 
  ON e.IS_CONVERSION = TRUE AND ...`
  },

  // =========================================
  // Fact → Marts (dbt transformations)
  // =========================================
  {
    id: 'edge-fct-dimcustomers',
    source: 'fct_customer_orders',
    target: 'dim_customers',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'CREATE TABLE',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:10:00',
    duration: '32s',
    queryId: 'dbt_run_20260202_071000_dim_customers',
    rowCount: 458723,
    sqlQuery: `-- dbt model: dim_customers
-- Materialized: table

CREATE OR REPLACE TABLE ACME_ANALYTICS.MARTS.DIM_CUSTOMERS AS
SELECT
  CUSTOMER_KEY,
  CUSTOMER_ID,
  MAX(CUSTOMER_EMAIL) AS EMAIL,
  MAX(CUSTOMER_NAME) AS FULL_NAME,
  SPLIT_PART(MAX(CUSTOMER_NAME), ' ', 1) AS FIRST_NAME,
  SPLIT_PART(MAX(CUSTOMER_NAME), ' ', -1) AS LAST_NAME,
  NULL AS COMPANY,
  MAX(COUNTRY) AS COUNTRY,
  NULL AS CITY,
  MIN(ORDER_DATE) AS FIRST_ORDER_DATE,
  MAX(ORDER_DATE) AS MOST_RECENT_ORDER_DATE,
  COUNT(DISTINCT ORDER_ID) AS TOTAL_ORDERS,
  SUM(ORDER_AMOUNT) AS TOTAL_REVENUE,
  AVG(ORDER_AMOUNT) AS AVERAGE_ORDER_VALUE,
  DATEDIFF('day', MIN(ORDER_DATE), CURRENT_DATE()) AS CUSTOMER_LIFETIME_DAYS,
  -- RFM Segmentation
  CASE 
    WHEN ... THEN 'Champion'
    WHEN ... THEN 'Loyal'
    WHEN ... THEN 'At Risk'
    ELSE 'Hibernating'
  END AS CUSTOMER_SEGMENT,
  CASE WHEN MAX(ORDER_DATE) >= DATEADD('day', -90, CURRENT_DATE()) THEN TRUE ELSE FALSE END AS IS_ACTIVE
FROM ANALYTICS_DB.ANALYTICS.FCT_CUSTOMER_ORDERS
GROUP BY CUSTOMER_KEY, CUSTOMER_ID;`
  },
  {
    id: 'edge-fct-dailyrevenue',
    source: 'fct_customer_orders',
    target: 'fct_daily_revenue',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'CREATE TABLE',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:10:00',
    duration: '18s',
    queryId: 'dbt_run_20260202_071000_fct_daily_revenue',
    rowCount: 945,
    storedProcedures: [
      {
        name: 'SP_CALC_DAILY_METRICS',
        schema: 'ACME_ANALYTICS.PROCS',
        lastModified: '2026-01-10',
        owner: 'Analytics Team',
        status: 'success'
      },
      {
        name: 'SP_REVENUE_FORECAST',
        schema: 'ACME_ANALYTICS.PROCS',
        lastModified: '2026-01-18',
        owner: 'Finance Analytics',
        status: 'scheduled'
      },
      {
        name: 'SP_ANOMALY_DETECTION',
        schema: 'ACME_ANALYTICS.ML',
        lastModified: '2026-01-25',
        owner: 'Data Science',
        status: 'failed'
      }
    ],
    tasks: [
      {
        name: 'dbt_mart_models',
        type: 'dbt Cloud Job',
        schedule: 'Daily at 7:10 AM UTC',
        lastRun: '2026-02-02 07:10:00',
        status: 'success',
        owner: 'Data Engineering'
      },
      {
        name: 'revenue_metrics_daily',
        type: 'Airflow DAG',
        schedule: 'Daily at 7:30 AM UTC',
        lastRun: '2026-02-02 07:30:00',
        status: 'success',
        owner: 'Analytics Engineering'
      },
      {
        name: 'TASK_REVENUE_ANOMALY_CHECK',
        type: 'Snowflake Task',
        schedule: 'Daily at 8:00 AM UTC',
        lastRun: '2026-02-02 08:00:00',
        status: 'scheduled',
        owner: 'Data Science'
      }
    ],
    sqlQuery: `-- dbt model: fct_daily_revenue
-- Materialized: table

CREATE OR REPLACE TABLE ACME_ANALYTICS.MARTS.FCT_DAILY_REVENUE AS
SELECT
  TO_NUMBER(TO_CHAR(ORDER_DATE, 'YYYYMMDD')) AS DATE_KEY,
  ORDER_DATE AS REVENUE_DATE,
  SUM(ORDER_AMOUNT) AS TOTAL_REVENUE,
  COUNT(DISTINCT ORDER_ID) AS ORDER_COUNT,
  COUNT(DISTINCT CUSTOMER_KEY) AS UNIQUE_CUSTOMERS,
  SUM(CASE WHEN FIRST_ORDER_FLAG THEN 1 ELSE 0 END) AS NEW_CUSTOMERS,
  COUNT(DISTINCT CUSTOMER_KEY) - SUM(CASE WHEN FIRST_ORDER_FLAG THEN 1 ELSE 0 END) AS RETURNING_CUSTOMERS,
  AVG(ORDER_AMOUNT) AS AVERAGE_ORDER_VALUE,
  SUM(CASE WHEN ORDER_STATUS = 'REFUNDED' THEN ORDER_AMOUNT ELSE 0 END) AS REFUND_AMOUNT,
  SUM(ORDER_AMOUNT) - SUM(CASE WHEN ORDER_STATUS = 'REFUNDED' THEN ORDER_AMOUNT ELSE 0 END) AS NET_REVENUE,
  (SUM(ORDER_AMOUNT) - LAG(SUM(ORDER_AMOUNT)) OVER (ORDER BY ORDER_DATE)) / 
    NULLIF(LAG(SUM(ORDER_AMOUNT)) OVER (ORDER BY ORDER_DATE), 0) * 100 AS REVENUE_GROWTH_PCT
FROM ANALYTICS_DB.ANALYTICS.FCT_CUSTOMER_ORDERS
GROUP BY ORDER_DATE;`
  },
  {
    id: 'edge-fct-attribution',
    source: 'fct_customer_orders',
    target: 'fct_attribution',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'CREATE TABLE',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:10:00',
    duration: '28s',
    queryId: 'dbt_run_20260202_071000_fct_attribution',
    rowCount: 2847563,
    sqlQuery: `-- dbt model: fct_attribution
-- Materialized: table

CREATE OR REPLACE TABLE ACME_ANALYTICS.MARTS.FCT_ATTRIBUTION AS
SELECT
  ROW_NUMBER() OVER (ORDER BY ORDER_ID) AS ATTRIBUTION_KEY,
  ORDER_ID,
  CUSTOMER_ID,
  ORDER_DATE AS ATTRIBUTION_DATE,
  ATTRIBUTION_CHANNEL AS CHANNEL,
  -- Campaign attribution logic
  NULL AS CAMPAIGN_ID,
  NULL AS CAMPAIGN_NAME,
  -- Touchpoint counting
  1 AS TOUCHPOINT_COUNT,
  ATTRIBUTION_CHANNEL AS FIRST_TOUCH_CHANNEL,
  ATTRIBUTION_CHANNEL AS LAST_TOUCH_CHANNEL,
  ORDER_AMOUNT AS ATTRIBUTED_REVENUE,
  'last_touch' AS ATTRIBUTION_MODEL
FROM ANALYTICS_DB.ANALYTICS.FCT_CUSTOMER_ORDERS
WHERE ATTRIBUTION_CHANNEL IS NOT NULL;`
  },
  {
    id: 'edge-fct-journey',
    source: 'fct_customer_orders',
    target: 'user_journey_agg',
    externalTool: EXTERNAL_TOOLS.DBT,
    queryType: 'CREATE TABLE',
    runBy: 'dbt_cloud_job',
    runOn: '2026-02-02 07:10:00',
    duration: '42s',
    queryId: 'dbt_run_20260202_071000_user_journey_agg',
    rowCount: 1234567,
    sqlQuery: `-- dbt model: user_journey_agg
-- Materialized: table

CREATE OR REPLACE TABLE ACME_ANALYTICS.MARTS.USER_JOURNEY_AGG AS
WITH user_journeys AS (
  -- Complex CTE joining sessions, events, and conversions
  SELECT ...
)
SELECT
  ROW_NUMBER() OVER (ORDER BY USER_ID, JOURNEY_DATE) AS JOURNEY_KEY,
  USER_ID,
  JOURNEY_DATE,
  COUNT(DISTINCT SESSION_ID) AS TOTAL_SESSIONS,
  SUM(PAGE_VIEWS) AS TOTAL_PAGE_VIEWS,
  COUNT(*) AS TOTAL_EVENTS,
  SUM(CASE WHEN IS_CONVERSION THEN 1 ELSE 0 END) AS CONVERSION_COUNT,
  DATEDIFF('day', FIRST_SESSION_DATE, CONVERSION_DATE) AS DAYS_TO_CONVERT,
  -- Funnel stage logic
  CASE WHEN ... THEN 'Awareness' WHEN ... THEN 'Consideration' ELSE 'Decision' END AS JOURNEY_STAGE,
  MODE(DEVICE_TYPE) AS PRIMARY_DEVICE,
  MODE(ATTRIBUTION_CHANNEL) AS PRIMARY_CHANNEL
FROM user_journeys
GROUP BY USER_ID, JOURNEY_DATE;`
  },

  // =========================================
  // Marts → Dashboards
  // =========================================
  {
    id: 'edge-dimcustomers-dashboard',
    source: 'dim_customers',
    target: 'customer-360-dashboard',
    externalTool: EXTERNAL_TOOLS.LOOKER,
    queryType: 'EXPLORE',
    runBy: 'looker_pdt_scheduler',
    runOn: '2026-02-02 08:00:00',
    duration: '2m 15s',
    queryId: 'looker_explore_customer360_20260202',
    rowCount: 458723,
    storedProcedures: [
      {
        name: 'SP_REFRESH_CUSTOMER_CACHE',
        schema: 'ACME_PROD.BI_CACHE',
        lastModified: '2026-01-28',
        owner: 'BI Team',
        status: 'success'
      }
    ],
    tasks: [
      {
        name: 'Looker PDT Rebuild',
        type: 'Looker PDT',
        schedule: 'Daily at 8:00 AM UTC',
        lastRun: '2026-02-02 08:00:00',
        status: 'success',
        owner: 'BI Team'
      },
      {
        name: 'customer_360_cache_warm',
        type: 'Airflow DAG',
        schedule: 'Daily at 8:30 AM UTC',
        lastRun: '2026-02-02 08:30:00',
        status: 'running',
        owner: 'Platform Team'
      }
    ],
    sqlQuery: `-- Looker Explore: customer_360
-- PDT refresh at 8:00 AM UTC

SELECT
  CUSTOMER_SEGMENT AS "Customer Segments",
  TOTAL_REVENUE AS "Lifetime Value",
  TOTAL_ORDERS AS "Total Orders",
  AVERAGE_ORDER_VALUE AS "Avg Order Value",
  -- Churn risk from ML model predictions
  CASE WHEN DAYS_SINCE_LAST_ORDER > 90 THEN 'High' 
       WHEN DAYS_SINCE_LAST_ORDER > 60 THEN 'Medium'
       ELSE 'Low' END AS "Churn Risk",
  FIRST_ORDER_DATE AS "Customer Since",
  COUNTRY AS "Country"
FROM ACME_ANALYTICS.MARTS.DIM_CUSTOMERS;`
  },
  {
    id: 'edge-dimcustomers-churn',
    source: 'dim_customers',
    target: 'churn_prediction_model',
    queryType: 'FEATURE EXTRACTION',
    runBy: 'airflow_ml_pipeline',
    runOn: '2026-02-02 09:00:00',
    duration: '5m 30s',
    queryId: 'ml_feature_extract_churn_20260202',
    rowCount: 458723,
    sqlQuery: `-- Feature extraction for Churn Prediction Model
-- Airflow DAG: ml_churn_prediction

SELECT
  CUSTOMER_ID,
  DATEDIFF('day', MOST_RECENT_ORDER_DATE, CURRENT_DATE()) AS days_since_last_order,
  TOTAL_ORDERS AS total_orders,
  AVERAGE_ORDER_VALUE AS average_order_value,
  CUSTOMER_LIFETIME_DAYS AS customer_lifetime_days,
  TOTAL_REVENUE AS total_revenue,
  TOTAL_ORDERS / NULLIF(CUSTOMER_LIFETIME_DAYS, 0) * 30 AS order_frequency,
  COUNTRY AS country,
  CUSTOMER_SEGMENT AS customer_segment
FROM ACME_ANALYTICS.MARTS.DIM_CUSTOMERS
WHERE IS_ACTIVE = TRUE;`
  },
  {
    id: 'edge-dailyrevenue-dashboard',
    source: 'fct_daily_revenue',
    target: 'exec-revenue-dashboard',
    externalTool: EXTERNAL_TOOLS.TABLEAU,
    queryType: 'EXTRACT REFRESH',
    runBy: 'tableau_backgrounder',
    runOn: '2026-02-02 07:30:00',
    duration: '1m 45s',
    queryId: 'tableau_extract_revenue_20260202',
    rowCount: 945,
    sqlQuery: `-- Tableau Extract: Executive Revenue Dashboard
-- Refresh Schedule: Every 4 hours

SELECT
  REVENUE_DATE AS "Date",
  TOTAL_REVENUE AS "Daily Revenue",
  AVG(TOTAL_REVENUE) OVER (ORDER BY REVENUE_DATE ROWS 6 PRECEDING) AS "Revenue Trend",
  ORDER_COUNT AS "Order Count",
  AVERAGE_ORDER_VALUE AS "AOV",
  UNIQUE_CUSTOMERS AS "Customer Count",
  -- Region derived from separate geo lookup
  NULL AS "Region"
FROM ACME_ANALYTICS.MARTS.FCT_DAILY_REVENUE
WHERE REVENUE_DATE >= DATEADD('month', -12, CURRENT_DATE());`
  },
  {
    id: 'edge-attribution-dashboard',
    source: 'fct_attribution',
    target: 'marketing-roi-dashboard',
    externalTool: EXTERNAL_TOOLS.LOOKER,
    queryType: 'EXPLORE',
    runBy: 'looker_pdt_scheduler',
    runOn: '2026-02-02 08:00:00',
    duration: '3m 20s',
    queryId: 'looker_explore_marketing_roi_20260202',
    rowCount: 2847563,
    sqlQuery: `-- Looker Explore: marketing_roi
-- PDT refresh at 8:00 AM UTC

SELECT
  CHANNEL AS "Channel",
  CAMPAIGN_NAME AS "Campaign",
  SUM(ad.SPEND_USD) AS "Spend",
  SUM(ATTRIBUTED_REVENUE) AS "Revenue",
  SUM(ATTRIBUTED_REVENUE) / NULLIF(SUM(ad.SPEND_USD), 0) AS "ROAS",
  COUNT(DISTINCT ORDER_ID) AS "Conversions",
  SUM(ad.SPEND_USD) / NULLIF(COUNT(DISTINCT ORDER_ID), 0) AS "CPA"
FROM ACME_ANALYTICS.MARTS.FCT_ATTRIBUTION fa
LEFT JOIN ACME_PROD.STAGING.STG_AD_SPEND ad ON fa.CAMPAIGN_ID = ad.CAMPAIGN_ID
GROUP BY CHANNEL, CAMPAIGN_NAME;`
  },
  {
    id: 'edge-attribution-model',
    source: 'fct_attribution',
    target: 'attribution_model',
    queryType: 'FEATURE EXTRACTION',
    runBy: 'airflow_ml_pipeline',
    runOn: '2026-02-02 09:30:00',
    duration: '8m 15s',
    queryId: 'ml_feature_extract_attribution_20260202',
    rowCount: 2847563,
    sqlQuery: `-- Feature extraction for Attribution Model
-- Airflow DAG: ml_attribution_model

SELECT
  ORDER_ID,
  CHANNEL AS channel,
  -- Touchpoint sequence computed from sessions
  ARRAY_AGG(CHANNEL) OVER (PARTITION BY CUSTOMER_ID ORDER BY ATTRIBUTION_DATE) AS touchpoint_sequence,
  DATEDIFF('day', FIRST_TOUCH_DATE, CONVERSION_DATE) AS time_to_conversion,
  TOUCHPOINT_COUNT AS touchpoint_count,
  CAMPAIGN_TYPE AS campaign_type,
  DEVICE_TYPE AS device_type
FROM ACME_ANALYTICS.MARTS.FCT_ATTRIBUTION;`
  },

  // =========================================
  // Dashboards → Exports
  // =========================================
  {
    id: 'edge-revenue-finance',
    source: 'exec-revenue-dashboard',
    target: 'finance-weekly-report',
    queryType: 'SCHEDULED EXPORT',
    runBy: 'tableau_scheduler',
    runOn: '2026-01-27 08:00:00',
    duration: '30s',
    queryId: 'tableau_export_finance_20260127',
    rowCount: 7,
    sqlQuery: `-- Tableau Server Scheduled Export
-- Runs: Every Monday 8:00 AM UTC
-- Destination: finance-team@acme.com

-- Exports PDF snapshot of Executive Revenue Dashboard
-- with week-over-week summary data as CSV attachment`
  },
  {
    id: 'edge-customer360-investor',
    source: 'customer-360-dashboard',
    target: 'investor-data-room',
    queryType: 'SCHEDULED EXPORT',
    runBy: 'looker_scheduler',
    runOn: '2026-02-01 00:00:00',
    duration: '45s',
    queryId: 'looker_export_investor_20260201',
    rowCount: 1,
    sqlQuery: `-- Looker Scheduled Export
-- Runs: 1st of each month at midnight UTC
-- Destination: Secure S3 bucket (investor-data-room)

-- Exports aggregated metrics:
-- - Monthly ARR calculation
-- - Total customer count
-- - Retention rate (cohort analysis)
-- - Growth metrics JSON`
  },
];

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

// Get edge metadata by source and target item IDs
function getEdgeMetadata(sourceId, targetId) {
  return objectEdges.find(edge => 
    edge.source === sourceId && edge.target === targetId
  ) || null;
}

// Build edge metadata lookup map
function buildEdgeMap() {
  const map = new Map();
  objectEdges.forEach(edge => {
    const key = `${edge.source}→${edge.target}`;
    map.set(key, edge);
  });
  return map;
}

// Export for use in main app
if (typeof window !== 'undefined') {
  window.mockLineageData = mockLineageData;
  window.columnLineage = columnLineage;
  window.objectEdges = objectEdges;
  window.COLUMN_TYPES = COLUMN_TYPES;
  window.OBJ_TYPES = OBJ_TYPES;
  window.EXTERNAL_TOOLS = EXTERNAL_TOOLS;
  window.getAllItems = getAllItems;
  window.buildItemMap = buildItemMap;
  window.findRelatedColumns = findRelatedColumns;
  window.getUpstreamColumns = getUpstreamColumns;
  window.getDownstreamColumns = getDownstreamColumns;
  window.getEdgeMetadata = getEdgeMetadata;
  window.buildEdgeMap = buildEdgeMap;
}
