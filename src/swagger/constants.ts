export const TVAPP_VERSION = 'v1';
export const PROVIDER_VERSION = 'v1';

export const SWAGGER_API_ROOT = 'api/hycon/docs';
export const SWAGGER_API_NAME = 'MyCarService API';
export const SWAGGER_API_DESCRIPTION = 'MyCarService API Description';
export const SWAGGER_API_CURRENT_VERSION = '1.0.0';

export const SWAGGER_PROVIDER_API_ROOT = `api/provider/${PROVIDER_VERSION}/docs`;
export const SWAGGER_PROVIDER_API_NAME = 'MyCarService Provider API';
export const SWAGGER_PROVIDER_API_DESCRIPTION = `
  <div>Mobile App Url</div>
  <a href="http://13.124.198.164:3000/connect?userKey=test&providerId=1">http://13.124.198.164:3000/connect?userKey={userKey}&providerId={providerId}</a>
  `;
export const SWAGGER_PROVIDER_API_CURRENT_VERSION = PROVIDER_VERSION;

export const SWAGGER_TVAPP_API_ROOT = `api/tvapp/${TVAPP_VERSION}/docs`;
export const SWAGGER_TVAPP_API_NAME = 'MyCarService TvApp API';
export const SWAGGER_TVAPP_API_DESCRIPTION =
  'MyCarService TvApp API Description';
export const SWAGGER_TVAPP_API_CURRENT_VERSION = TVAPP_VERSION;
