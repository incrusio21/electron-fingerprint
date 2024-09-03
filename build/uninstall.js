const elevate = require('node-windows').elevate;

elevate('schtasks /delete /tn "tes" /f', function(error) {
  if (error) {
    console.error('Gagal menghapus task:', error);
  } else {
    console.log('Task berhasil dihapus.');
  }
});
