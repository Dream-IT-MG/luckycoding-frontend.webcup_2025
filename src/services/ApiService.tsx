import { ClassDictionary } from 'clsx';
import React from 'react'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

async function request(endpoint: string, method = 'GET', data = null) {
  const options: any = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`HTTP error! status: ${res.status}, message: ${error}`);
  }

  return res.json();
}


// Méthodes spécifiques
export const ApiService = {
  get: (endpoint: string) => request(endpoint, 'GET'),
  post: (endpoint: string, data: any) => request(endpoint, 'POST', data),
  put: (endpoint: string, data: any) => request(endpoint, 'PUT', data),
  delete: (endpoint: string) => request(endpoint, 'DELETE'),
};
