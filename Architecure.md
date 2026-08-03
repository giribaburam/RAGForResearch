# Architecture.md: Multimodal Research RAG System

## 1. Executive Summary
This document outlines the system architecture for a production-grade **Multimodal Retrieval-Augmented Generation (RAG)** pipeline explicitly designed for academic research, technical papers, and scientific documentation. Standard text-only RAG pipelines fail in this domain because critical domain knowledge is frequently locked inside 2D layouts, mathematical equations, data tables, and architectural charts. 

This architecture adopts a **Hybrid Multimodal Retrieval Strategy** combining layout-aware document chunking, multi-vector/dense embedding schemas, and Vision-Language Model (VLM) synthesis.

---

## 2. System Architecture Diagram

```mermaid
flowchart TD
    subgraph Ingestion["1. Document Ingestion & Parsing"]
        PDF[Research PDFs / Docs] --> Parser[Layout-Aware Parser: MinerU / Docling]
        Parser --> TextBlock[Clean Markdown Text]
        Parser --> TableBlock[Tables / Structured Data]
        Parser --> FigureBlock[Cropped Figures & Diagrams + Captions]
        Parser --> FormulaBlock[LaTeX Math Formulas]
    end

    subgraph Indexing["2. Embedding & Multi-Index Storage"]
        TextBlock --> TextEmbed[Dense Embedder: BGE-M3 / OpenAI]
        TableBlock --> TableMarkdown[HTML / Markdown Conversion]
        FigureBlock --> VLMDesc[VLM Summarizer: GPT-4o / Qwen2-VL]
        
        TextEmbed --> VectorDB[(Vector Database / Qdrant)]
        TableMarkdown --> VectorDB
        VLMDesc --> VectorDB
        
        PDF --> PageRaster[Page Rasterizer (Optional ColPali Pipeline)] --> DocStore[(Multi-Vector Store)]
    end

    subgraph Retrieval["3. Hybrid Multimodal Retrieval"]
        UserQuery([User Query: Text / Visual Question]) --> QueryRouter{Query Intent Router}
        QueryRouter -->|Semantic/Keyword| TextSearch[Text k-NN & BM25 Search]
        QueryRouter -->|Visual/Chart/Table| VisualSearch[Image Summary & Table Vector Search]
        
        TextSearch --> ContextAssembler[Context Assembler]
        VisualSearch --> ContextAssembler
    end

    subgraph Generation["4. Multimodal Generation & Citation"]
        ContextAssembler --> Prompt[Interleaved Prompt Construction]
        Prompt --> VLM[Vision-Language Model: Claude 3.5 Sonnet / GPT-4o]
        VLM --> FinalOutput([Synthesized Answer with Bounding-Box/Figure Citations])
    end# Architecture.md: Multimodal Research RAG System

## 1. Executive Summary
This document outlines the system architecture for a production-grade **Multimodal Retrieval-Augmented Generation (RAG)** pipeline explicitly designed for academic research, technical papers, and scientific documentation. Standard text-only RAG pipelines fail in this domain because critical domain knowledge is frequently locked inside 2D layouts, mathematical equations, data tables, and architectural charts. 

This architecture adopts a **Hybrid Multimodal Retrieval Strategy** combining layout-aware document chunking, multi-vector/dense embedding schemas, and Vision-Language Model (VLM) synthesis.

---

## 2. System Architecture Diagram

```mermaid
flowchart TD
    subgraph Ingestion["1. Document Ingestion & Parsing"]
        PDF[Research PDFs / Docs] --> Parser[Layout-Aware Parser: MinerU / Docling]
        Parser --> TextBlock[Clean Markdown Text]
        Parser --> TableBlock[Tables / Structured Data]
        Parser --> FigureBlock[Cropped Figures & Diagrams + Captions]
        Parser --> FormulaBlock[LaTeX Math Formulas]
    end

    subgraph Indexing["2. Embedding & Multi-Index Storage"]
        TextBlock --> TextEmbed[Dense Embedder: BGE-M3 / OpenAI]
        TableBlock --> TableMarkdown[HTML / Markdown Conversion]
        FigureBlock --> VLMDesc[VLM Summarizer: GPT-4o / Qwen2-VL]
        
        TextEmbed --> VectorDB[(Vector Database / Qdrant)]
        TableMarkdown --> VectorDB
        VLMDesc --> VectorDB
        
        PDF --> PageRaster[Page Rasterizer (Optional ColPali Pipeline)] --> DocStore[(Multi-Vector Store)]
    end

    subgraph Retrieval["3. Hybrid Multimodal Retrieval"]
        UserQuery([User Query: Text / Visual Question]) --> QueryRouter{Query Intent Router}
        QueryRouter -->|Semantic/Keyword| TextSearch[Text k-NN & BM25 Search]
        QueryRouter -->|Visual/Chart/Table| VisualSearch[Image Summary & Table Vector Search]
        
        TextSearch --> ContextAssembler[Context Assembler]
        VisualSearch --> ContextAssembler
    end

    subgraph Generation["4. Multimodal Generation & Citation"]
        ContextAssembler --> Prompt[Interleaved Prompt Construction]
        Prompt --> VLM[Vision-Language Model: Claude 3.5 Sonnet / GPT-4o]
        VLM --> FinalOutput([Synthesized Answer with Bounding-Box/Figure Citations])
    end
