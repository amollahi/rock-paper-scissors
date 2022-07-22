@ECHO OFF



set game-rest-apiHOST=http://localhost:8080



:: del api /F /Q /S

:: ANGULAR
:: RestAPI

call openapi-generator-cli generate -i %game-rest-apiHOST%/api-docs -g typescript-angular --additional-properties apiModulePrefix=GameRest,configurationPrefix=GameRest,fileNaming=kebab-case,enumNameSuffix=,enumPropertyNaming=UPPERCASE,stringEnums=true -o libs/core/src/lib/api-client --skip-validate-spec --type-mappings=DateTime=Date,date=Date -t tools/open-api-templates


