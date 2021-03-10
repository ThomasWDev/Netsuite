/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define([
        'N/https',
        'N/record',
        'N/file',
        'N/log',
        './moment.js'],
    function (https, record, file, log, moment) {

        function uplaodFile(request) {
            var filedata = request;

            // var arr = filedata.file.split(','),
            //     mime = arr[0].match(/:(.*?);/)[1],
            //     bstr = arr[1];

            // return {
            //     mime: mime,
            //     bstr: bstr
            // }

            var fileObj = file.create({
                name: filedata.name,
                fileType: filedata.type,
                contents: filedata.fileString,
                isOnline : true
            });
            fileObj.folder = 60472;

            var id = fileObj.save();
            fileObj = file.load({
                id: id
            });

            if (fileObj) {
                log.debug('fileObj Result', fileObj);
                return {
                    message: fileObj
                };
            } else {
                return fileObj;
            }
        }

        function getfile(datain) {
            var cabinatefile = file.load({
                id: datain.id
            });
            log.debug('log-file', cabinatefile);

            return {
                "id": cabinatefile.id,
                "name": cabinatefile.name,
                "path": cabinatefile.path,
                "url": cabinatefile.url,
            }

        }

        return {
            post: uplaodFile,
            get: getfile
        };
    }
);
