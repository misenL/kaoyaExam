const config = [
  {
    name: '测试',
    commit: false, // 是否同时提交到远程仓库
    ssh: {
      host: '47.107.88.202',
      port: 22,
      username: 'root',
      password: 'Huikao2020'
      // privateKey: 'E:/id_rsa', // ssh私钥(不使用此方法时请勿填写， 注释即可)
      // passphrase: '123456' // ssh私钥对应解密密码(不存在设为''即可)
    },
    targetDir: './dist', // 目标压缩目录(绝对地址)
    targetFile: 'dist.zip', // 目标文件
    openCompress: true, // 是否开启本地压缩
    openBackUp: false, // 是否开启远端备份
    deployDir: '/root/chochik/www/', // 远端目录
    releaseDir: 'zhikao-h5' // 发布目录
  }
]

module.exports = config
