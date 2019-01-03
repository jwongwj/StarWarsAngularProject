// This is more useful in bigger applications whereby numerous pages share same value

// Strings
export const STRING_CREATED: string = 'created';
export const STRING_EDITED: string = 'edited';
export const STRING_URL: string = 'url';
export const STRING_PEOPLE: string = 'people';
export const STRING_CHARACTERS: string = 'characters';

// Messages
export const MESSAGES_SAMPLE_AUTO_GENERATED : string = 'This is an auto-generated report. For any enquires please contact 999';

// URL Paths
export const URL_SWAPI : string = 'https://swapi.co/api/';
export const URL_STARWARS_VG : string = 'https://starwars-visualguide.com/assets/img/';
export const URL_LINK: string = 'https://jwongwj.github.io/StarWarsAngularProject/';

// Regex [Cannot be const]
export var REGEX_PROTOCOL : string = '^((https?:)?\\/\\/)?';
export var REGEX_AUTHENTICATION : string = '(?:\\S+(?::\\S*)?@)?';
export var REGEX_DOMAIN_NAME : string = '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|';
export var REGEX_IP_V4_ADD : string = '((\\d{1,3}\\.){3}\\d{1,3}))';
export var REGEX_PORT_AND_PATH : string = '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*';
export var REGEX_QUERY_STRING : string = '(\\?[;&a-z\\d%_.~+=-]*)?';
export var REGEX_FRAGMENT_LOCATER : string = '(\\#[-a-z\\d_]*)?$';
