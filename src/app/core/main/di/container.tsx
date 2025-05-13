"use client"
import React, { createContext, useContext } from 'react';


export type Container = Record<string, any>;


const ContainerContext = createContext<Container>({});

export const ContainerProvider: React.FC<{
  container: Container;
  children: React.ReactNode;
}> = ({ container, children }) => {
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
};



export const useContainer = <T extends unknown>(key: string): T => {
  const container = useContext(ContainerContext);
  
  if (!container[key]) {
    throw new Error(`Dependency ${key} not found in container`);
  }
  
  return container[key] as T;
};






export const useDependencies = <T extends Record<string, string>>(
  deps: T
): { [K in keyof T]: unknown } => {
  const container = useContext(ContainerContext);
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(deps)) {
    if (!container[value]) {
      throw new Error(`Dependency ${value} not found in container`);
    }
    result[key] = container[value];
  }

  return result as { [K in keyof T]: unknown };
};