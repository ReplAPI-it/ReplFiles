# **ReplFiles!**
*Fetch ANY File from a Public Repl*

**Check out the API [here](https://replfiles.rayhanadev.repl.co/)**  
**Quick Preview/Proof-of-Concept [here](https://replfiles.rayhanadev.repl.co/file/RayhanADev/ArchiveIt?filename=src/index.js&raw=1)**

## Usage
The API has two endpoints:
* `/file/{username}/{repl-slug}`
* `/files/{username}/{repl-slug}`

The former is used for fetching a specific file. It returns an array with the file contents.
*Example*:
`https://replfiles.rayhanadev.repl.co/file/RayhanADev/ArchiveIt?filename=src/index.js`

You can also attach a `raw=1` query to output the raw text without stringifying and nonsense.
*Example*:
`https://replfiles.rayhanadev.repl.co/file/RayhanADev/ArchiveIt?filename=src/index.js&raw=1`

--

The latter is used to get ALL files from a Repl. It returns an array with all files in a Repl. This uses a `.gitignore` file if present to filter out files.
*Example*:
`https://replfiles.rayhanadev.repl.co/files/RayhanADev/ArchiveIt`
