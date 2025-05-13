

export interface UseCase<I, O> {
  execute(input: I): Promise<O>;
}


export interface NoInputUseCase<O> {
  execute(): Promise<O>;
}


export interface VoidUseCase<I> {
  execute(input: I): Promise<void>;
}

export interface NoInputVoidUseCase {
  execute(): Promise<void>;
}
