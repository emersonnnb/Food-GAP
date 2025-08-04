export interface PedidoDTO {
  produto: ProdutoDTO;
  quantidade: number;
  total: number;
  formaPagamento: string;
}

export interface ProdutoDTO {
  id: number;  
  nome: string;
  descricao?: string;
  categoriaId?: number;
  preco?: number;
  quantidade?: number;
  limite?: number;
  imagem?: string;
}

