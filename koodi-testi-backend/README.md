# koodi-testi-backend

## Configuration
By default you don't need to change anything, but if you want you can change the environment variables or add a [.env](https://github.com/motdotla/dotenv) file.
| Environment variable     | Default value | Description |
| ------------------------ |:-------------:| ---- |
| API_PORT                 | 4000          | |
| SURVEY_ANSWERS_DIRECTORY | .             | Output directory for survey answer json files. Can be realtive to the working directory (e.g. `survey_results` or an absolute path (e.g. `/home/user/survey_results`). Defaults to the current working directory. Make sure that the directory exists. |

## Installing Dependencies
`yarn install` will install the required dependencies defined in package.json

## Running
`yarn start` will run a dev server with ts-node.

## Building
`yarn build` builds the program for production to the `build` folder. Run `node dist/index.js` to run the compiled program.
