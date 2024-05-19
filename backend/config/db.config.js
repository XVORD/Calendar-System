module.exports = {
    HOST: "ep-holy-sun-a1barvf5.ap-southeast-1.aws.neon.tech",
    USER: "ChristopherSatya_8_owner",
    PASSWORD: "AZghfFsv26lo",
    DB: "ChristopherSatya_8",
    dialectOptions: {
        ssl: {
          require: true, 
          rejectUnauthorized: false
        }
      },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };