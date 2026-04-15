# Language Model API Tutorial Sample

This is the source code for the [Language Model API Tutorial](https://code.visualstudio.com/api/extension-guides/ai/language-model-tutorial). It demonstrates how to use the GitHub Copilot Language Model API to build an extension that annotates your code with inline tutoring tips.

## Demo
![VS Code displaying custom annotations from GitHub Copilot as annotations](https://code.visualstudio.com/assets/api/extension-guides/images/ai/lm-api/code-tutor-annotations-gif.gif)

### Running the sample

- Run `npm install` in terminal to install dependencies
- Run the `Run Extension` target in the Debug View. This will:
    - Start a task `npm: watch` to compile the client code
    - Run the extension in a new VS Code window.
- Open a folder in the new VS Code window.
- Open a code file.
- Run the `Toggle Tutor Annotations` command from the command palette.