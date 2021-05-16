> This API has been deprecated due to Replit changing its .zip path usage.
> Hopefully this will change in the future, but do not expect any updates.
> Thank you for taking your time to explore this project!

> Part of the [ReplAPI.it Project](https://replit.com/@ReplAPIit)

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


# ReplFiles
This is ReplFiles, an API that allows you to fetch the content of any file, on any public Repl! It functions by retrieving the zipfile of a Repl and then reads the content of a file inside zip.

## Usage
The API can be found at:
`https:/filesapi.replapiit.repl.co`

Available Endpoints include:
* `/file/{username}/{repl-slug}?filename={filename}`
* `/files/{username}/{repl-slug}`

The output is a JSON object with the content of a file in JSON stringified format.
*Note*: for the `/file/{username}/{repl-slug}?filename={filename}` endpoint you can add `&raw=1` to output the raw file content.

## Examples
Fetching: `https://filesapi.replapiit.repl.co/files/HelperFurret/Example-Project?filename=index.js`  
Returns:
```json
[
	"/*\n  Hello there.\n  The name's HelperFurret!\n  \n  I help RayhanADev out when\n  he's developing things :D.\n*/"
]
```

Fetching: `https://filesapi.replapiit.repl.co/files/HelperFurret/Example-Project?filename=index.js&raw=1`  
Returns:
```txt
/*
  Hello there.
  The name's HelperFurret!
  
  I help RayhanADev out when
  he's developing things :D.
*/
```

Fetching: `https://filesapi.replapiit.repl.co/files/HelperFurret/Example-Project`  
Returns:
```json
[
	{
		"fileName": "index.js",
		"fileContent": "/*\n  Hello there.\n  The name's HelperFurret!\n  \n  I help RayhanADev out when\n  he's developing things :D.\n*/"
	}
]
```

[contributors-shield]: https://img.shields.io/github/contributors/ReplAPI-it/ReplFiles.svg?style=for-the-badge
[contributors-url]: https://github.com/ReplAPI-it/ReplFiles/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ReplAPI-it/ReplFiles.svg?style=for-the-badge
[forks-url]: https://github.com/ReplAPI-it/ReplFiles/network/members
[stars-shield]: https://img.shields.io/github/stars/ReplAPI-it/ReplFiles.svg?style=for-the-badge
[stars-url]: https://github.com/ReplAPI-it/ReplFiles/stargazers
[issues-shield]: https://img.shields.io/github/issues/ReplAPI-it/ReplFiles.svg?style=for-the-badge
[issues-url]: https://github.com/ReplAPI-it/ReplFiles/issues
[license-shield]: https://img.shields.io/github/license/ReplAPI-it/ReplFiles.svg?style=for-the-badge
[license-url]: https://github.com/ReplAPI-it/ReplFiles/blob/master/LICENSE.txt
