const uploadFile = require("../middleware/upload");
const fs = require('fs');
const config = require('../index');

const UPLOAD_FILES_DIR = config.UPLOAD_FILES_DIR

const upload = async (req, res) => {
	try {
		await uploadFile(req, res);

		if (req.file == undefined) {
			return res.status(400).send({ message: "Please upload a file!" });
		}

		res.status(200).send({
			message: "Uploaded the file successfully: " + req.file.originalname,
		});
	} catch (err) {
		res.status(500).send({
			message: `Could not upload the file: ${req.file.originalname}. ${err}`,
		});
	}
};
const getListFiles = (req, res) => {
	// console.log('req',req.query.path)
	const directoryPath = UPLOAD_FILES_DIR + req.query.path
	console.log('file', directoryPath)
	fs.access(directoryPath, function (error) {
		if (error) {
			console.log("Directory does not exist.")
			res.status(500).send({
				message: "Directory does not exist.",
			});
		}
		else {
			fs.readdir(directoryPath, function (err, files) {
				if (err) {
					res.status(500).send({
						message: "Unable to scan files!",
					});
				}

				let fileInfos = [];
				if (files !== undefined) {
					files.forEach((file) => {
						const stats = fs.statSync(`${directoryPath}/${file}`)
						
						fileInfos.push({
							name: file,
							url: UPLOAD_FILES_DIR + file,
							type: '',
							isFile: stats.isFile(),
							isDirectory: stats.isDirectory(),
						});
					});
				}
				res.status(200).send(fileInfos);
			});
		}
	});

};

const download = (req, res) => {
	const fileName = req.query.path;
	const directoryPath = UPLOAD_FILES_DIR;

	console.log('dir', directoryPath + fileName)

	res.download(directoryPath + fileName, fileName, (err) => {
		if (err) {
			console.log('error', err)
			res.status(500).send({
				message: "Could not download the file. " + err,
			});
		}
	});
};

module.exports = {
	upload,
	getListFiles,
	download,
};
