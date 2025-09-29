export const API_URL = `${process.env.APP_SERVER_URL}/api`;
export const getGenresUrl = (str: string) => `/genres${str}`;
export const getUserUrl = (str: string) => `/users${str}`;
export const getMoviesUrl = (str: string) => `/movies${str}`;
export const getActorsUrl = (str: string) => `/actors${str}`;
export const getRatingUrl = (str: string) => `/ratings${str}`;
