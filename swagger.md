# MyCarService API
MyCarService API Description

## Version: 1.0.0

### /

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /health

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | The Health Check is successful |
| 503 | The Health Check is not successful |

### /api/auth/login

#### POST
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Successful Login |
| 400 | Bad Request |
| 401 | Unauthorized |

### /api/auth/register

#### POST
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Successful Registration |
| 400 | Bad Request |
| 401 | Unauthorized |

### /api/auth/me

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful Response |
| 401 | Unauthorized |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/user/{id}

#### GET
##### Summary

Retrieve a single User

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | number |
| fields | query | Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> | No | [ string ] |
| join | query | Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> | No | [ string ] |
| cache | query | Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Get one base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/user

#### GET
##### Summary

Retrieve multiple Users

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| fields | query | Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> | No | [ string ] |
| s | query | Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> | No | string |
| filter | query | Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> | No | [ string ] |
| or | query | Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> | No | [ string ] |
| sort | query | Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> | No | [ string ] |
| join | query | Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> | No | [ string ] |
| limit | query | Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> | No | integer |
| offset | query | Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> | No | integer |
| page | query | Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> | No | integer |
| cache | query | Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Get many base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

#### POST
##### Summary

Create a single User

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Get create one base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/event/{id}

#### GET
##### Summary

Retrieve a single Event

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | number |
| fields | query | Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> | No | [ string ] |
| join | query | Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> | No | [ string ] |
| cache | query | Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Get one base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/event

#### GET
##### Summary

Retrieve multiple Events

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| fields | query | Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> | No | [ string ] |
| s | query | Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> | No | string |
| filter | query | Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> | No | [ string ] |
| or | query | Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> | No | [ string ] |
| sort | query | Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> | No | [ string ] |
| join | query | Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> | No | [ string ] |
| limit | query | Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> | No | integer |
| offset | query | Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> | No | integer |
| page | query | Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> | No | integer |
| cache | query | Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Get many base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

#### POST
##### Summary

Create a single Event

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Get create one base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/eventLog/{id}

#### GET
##### Summary

Retrieve a single EventLog

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | number |
| fields | query | Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> | No | [ string ] |
| join | query | Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> | No | [ string ] |
| cache | query | Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Get one base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/eventLog

#### GET
##### Summary

Retrieve multiple EventLogs

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| fields | query | Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> | No | [ string ] |
| s | query | Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> | No | string |
| filter | query | Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> | No | [ string ] |
| or | query | Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> | No | [ string ] |
| sort | query | Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> | No | [ string ] |
| join | query | Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> | No | [ string ] |
| limit | query | Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> | No | integer |
| offset | query | Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> | No | integer |
| page | query | Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> | No | integer |
| cache | query | Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Get many base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

#### POST
##### Summary

Create a single EventLog

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Get create one base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/consumer/{id}

#### GET
##### Summary

Retrieve a single Consumer

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | number |
| fields | query | Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> | No | [ string ] |
| join | query | Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> | No | [ string ] |
| cache | query | Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Get one base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/consumer

#### GET
##### Summary

Retrieve multiple Consumers

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| fields | query | Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> | No | [ string ] |
| s | query | Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> | No | string |
| filter | query | Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> | No | [ string ] |
| or | query | Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> | No | [ string ] |
| sort | query | Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> | No | [ string ] |
| join | query | Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> | No | [ string ] |
| limit | query | Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> | No | integer |
| offset | query | Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> | No | integer |
| page | query | Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> | No | integer |
| cache | query | Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Get many base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

#### POST
##### Summary

Create a single Consumer

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Get create one base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/provider/{id}

#### GET
##### Summary

Retrieve a single Provider

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | number |
| fields | query | Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> | No | [ string ] |
| join | query | Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> | No | [ string ] |
| cache | query | Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Get one base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/provider

#### GET
##### Summary

Retrieve multiple Providers

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| fields | query | Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> | No | [ string ] |
| s | query | Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> | No | string |
| filter | query | Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> | No | [ string ] |
| or | query | Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> | No | [ string ] |
| sort | query | Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> | No | [ string ] |
| join | query | Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> | No | [ string ] |
| limit | query | Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> | No | integer |
| offset | query | Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> | No | integer |
| page | query | Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> | No | integer |
| cache | query | Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Get many base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

#### POST
##### Summary

Create a single Provider

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Get create one base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/message/{id}

#### GET
##### Summary

Retrieve a single Message

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | number |
| fields | query | Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> | No | [ string ] |
| join | query | Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> | No | [ string ] |
| cache | query | Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Get one base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/message

#### GET
##### Summary

Retrieve multiple Messages

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| fields | query | Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> | No | [ string ] |
| s | query | Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> | No | string |
| filter | query | Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> | No | [ string ] |
| or | query | Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> | No | [ string ] |
| sort | query | Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> | No | [ string ] |
| join | query | Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> | No | [ string ] |
| limit | query | Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> | No | integer |
| offset | query | Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a> | No | integer |
| page | query | Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> | No | integer |
| cache | query | Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a> | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Get many base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

#### POST
##### Summary

Create a single Message

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Get create one base response |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /api/statistics/total

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Fetch Profile Request Received |
| 400 | Fetch Profile Request Failed |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### Models

#### LoginPayload

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| userId | string |  | Yes |
| password | string |  | Yes |

#### RegisterPayload

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| userId | string |  | Yes |
| name | string |  | Yes |
| password | string |  | Yes |
| passwordConfirmation | string |  | Yes |

#### GetManyUserResponseDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ object ] |  | Yes |
| count | number |  | Yes |
| total | number |  | Yes |
| page | number |  | Yes |
| pageCount | number |  | Yes |

#### User

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string |  | Yes |
| role | string |  | Yes |
| status | string |  | Yes |

#### GetManyEventResponseDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ object ] |  | Yes |
| count | number |  | Yes |
| total | number |  | Yes |
| page | number |  | Yes |
| pageCount | number |  | Yes |

#### Event

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| messageId | string |  | Yes |
| userId | string |  | Yes |
| providerId | string |  | Yes |
| providerKey | string |  | Yes |
| providerCode | string |  | Yes |
| eventType | string |  | Yes |
| categroy | string |  | Yes |
| issuedAt | dateTime |  | Yes |
| userMappingId | number |  | Yes |

#### GetManyEventLogResponseDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ object ] |  | Yes |
| count | number |  | Yes |
| total | number |  | Yes |
| page | number |  | Yes |
| pageCount | number |  | Yes |

#### EventLog

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| eventType | string |  | Yes |
| status | string |  | Yes |
| dateAt | dateTime |  | Yes |
| userId | string |  | Yes |
| categroy | string |  | Yes |
| consumerCode | string |  | Yes |
| providerKey | string |  | Yes |
| message | object |  | Yes |
| transmissionAt | dateTime |  | Yes |
| receptionAt | dateTime |  | Yes |
| eventId | number |  | Yes |

#### GetManyConsumerResponseDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ object ] |  | Yes |
| count | number |  | Yes |
| total | number |  | Yes |
| page | number |  | Yes |
| pageCount | number |  | Yes |

#### Consumer

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| consumerCode | string |  | Yes |
| consumerType | string |  | Yes |
| consumerName | string |  | Yes |
| consumerServerIp | number |  | Yes |
| consumerServerPort | string |  | Yes |
| consumerMacAddress | string |  | Yes |
| apiEntry | string |  | Yes |
| auth | string |  | Yes |
| consumerOs | string |  | Yes |
| consumerDomain | string |  | Yes |
| consumerServerType | string |  | Yes |

#### GetManyProviderResponseDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ object ] |  | Yes |
| count | number |  | Yes |
| total | number |  | Yes |
| page | number |  | Yes |
| pageCount | number |  | Yes |

#### Provider

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| providerCode | string |  | Yes |
| providerName | string |  | Yes |
| providerServerIp | string |  | Yes |
| providerServerPort | string |  | Yes |
| providerMacAddress | string |  | Yes |
| apiEntry | string |  | Yes |
| auth | string |  | Yes |
| providerOs | string |  | Yes |
| providerDomain | string |  | Yes |
| providerServerType | string |  | Yes |

#### GetManyMessageResponseDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ object ] |  | Yes |
| count | number |  | Yes |
| total | number |  | Yes |
| page | number |  | Yes |
| pageCount | number |  | Yes |

#### Message

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| messageId | string |  | Yes |
| icon | string |  | Yes |
| message | object |  | Yes |
