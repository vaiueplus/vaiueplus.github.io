/** @type {import('next').NextConfig} */

const path = require('path')
console.log(__dirname);

const nextConfig = {  
  output: 'export',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
