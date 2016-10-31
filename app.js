$(function(){
    var serverAddress = location.hostname + ':1992';
    var socket = io.connect(serverAddress);
    $("input[type=file]").fileinput({'showUpload':false, 'previewFileType':'any'});
    $('#upload-form').submit(function(){
        $progress = $('#progress');
        $panelFooter = $('#panel-footer');
        var file = this.files.files[0];
        var stream = ss.createStream();
        var blobStream = ss.createBlobReadStream(file);
        var size = 0;
        blobStream.on('data',function(chunk) {
            size += chunk.length;
            console.log(size);
            $progress.css('width', (Math.floor(size / file.size * 100) + '%') );
        });
        blobStream.on('end',function(chunk) {
            $panelFooter.hide();
            $progress.css('width', '0%');
            alert('Uploaded!');
        });

        $panelFooter.show();
        ss(socket).emit('upload', stream, {name: file.name, size: file.size});
        blobStream.pipe(stream);

        return false;
    });
});