import request from '@/utils/request'

export function getScore(params) {
    return request({
      url: `https://api.securityscorecards.dev/projects/github.com/axios/axios`,
      method: 'get',
      params
    })
  }
  