# RAG for Research: End-to-End System Flow Specifications

## Overview

This document defines the core operational flows of the **RAG for Research** platform.

The system transforms raw academic documents into structured multimodal knowledge representations and enables evidence-grounded research assistance through:

- Layout-aware document understanding
- Multimodal extraction
- Multi-index retrieval
- Vision-language reasoning
- Citation verification
- Research export workflows

The architecture principle:

> Retrieve evidence first, reason second, generate last.

---

# Flow 1: Document Ingestion & Vector Indexing Flow

## Purpose

Convert raw academic documents into structured, searchable multimodal knowledge representations.

---

# User Flow

## Step 1: Upload Research Documents

### User Action

The researcher:

1. Opens the document library.
2. Creates a research collection.
3. Uploads PDF documents.

Example:
Collection:

CRISPR Delivery Research 2026

Files:

paper01.pdf
paper02.pdf
paper03.pdf


---

# System Flow

```mermaid
sequenceDiagram

participant User
participant UI
participant Storage
participant Parser
participant Indexer
participant VectorDB


User->>UI:
Upload research papers

UI->>Storage:
Store original PDFs

Storage->>Parser:
Start document processing

Parser->>Indexer:
Generate multimodal objects

Indexer->>VectorDB:
Create searchable indexes

VectorDB->>UI:
Processing completed

Step 2: Document Validation

Before processing, the system validates incoming files.

| Validation          | Purpose                      |
| ------------------- | ---------------------------- |
| File integrity      | Detect corrupted PDFs        |
| Page count          | Estimate processing cost     |
| Language detection  | Select OCR pipeline          |
| Metadata extraction | Capture author/year/title    |
| Duplicate detection | Prevent unnecessary indexing |

Step 3: Layout-Aware Parsing

The parser performs deep document understanding.

It identifies:

Titles
Sections
Headers
Footers
Text blocks
Figures
Charts
Tables
Mathematical equations
Example Page Layout

+-----------------------+
| Title                 |
|-----------------------|
| Text Column | Figure  |
|             | Chart   |
|-------------|---------|
| Table                 |
|-----------------------|
| Equation              |
+-----------------------+

Extracted Document Objects

Example:

{
  "page": 4,
  "blocks": [
    {
      "type": "heading",
      "content": "Results"
    },
    {
      "type": "text",
      "content": "The experiment shows..."
    },
    {
      "type": "equation",
      "latex": "E=mc^2"
    },
    {
      "type": "figure",
      "asset": "figure_04.png"
    }
  ]
}

Step 4: Multimodal Processing
4.1 Text Processing

Pipeline:

Text Extraction

        ↓

Section Detection

        ↓

Semantic Chunking

        ↓

Parent-Child Mapping

        ↓

Embedding Generation

Stored representation:

{
"type":"text",
"section":"3.2 Results",
"page":7,
"embedding":"vector"
}

4.2 Equation Processing
Requirements

The system must:

Preserve LaTeX formatting.
Maintain mathematical relationships.
Prevent OCR corruption.
Preserve subscripts, superscripts, and matrices.

Example:

Input:

4.2 Equation Processing
Requirements

The system must:

Preserve LaTeX formatting.
Maintain mathematical relationships.
Prevent OCR corruption.
Preserve subscripts, superscripts, and matrices.

Example:

Input:
Probability distribution equation

Stored:
P(x)=\frac{e^{x_i}}{\sum_j e^{x_j}}

4.3 Table Processing

Pipeline:
PDF Table

      ↓

Structure Detection

      ↓

Markdown Conversion

      ↓

Embedding

      ↓

Index Storage

Example:
| Model | Accuracy |
|---|---|
| CNN | 91% |
| Transformer | 95% |

4.4 Figure Processing

Pipeline:
Image Extraction

        ↓

Caption Extraction

        ↓

Vision Model Analysis

        ↓

Description Generation

        ↓

Embedding Generation

Example generated description:
Line chart comparing model latency
across five benchmark datasets.

Model B achieves lowest inference time.

Step 5: Multi-Index Storage

The system maintains separate indexes by modality.

Text Index

Contains:

Paragraphs
Sections
Equations
Definitions

Table Index

Contains:

Structured data
Experimental results
Comparisons
Metrics

Figure Index

Contains:

Image descriptions
Captions
Visual metadata

Optional Visual Index

Supports:

ColPali
Multi-vector visual retrieval
Page-level visual embeddings

Flow 2: Research Query & Retrieval Flow
Purpose

Answer complex research questions using evidence-grounded retrieval.

User Action

Example query:

How does the proposed architecture compare
with Transformer baseline latency?

Query Pipeline
flowchart LR

Query

-->

IntentRouter

-->

HybridSearch

-->

ContextAssembly

-->

VLM

-->

Answer

Step 1: Query Understanding

The Query Router classifies intent.

| Intent       | Retrieval Source   |
| ------------ | ------------------ |
| Conceptual   | Text Index         |
| Numerical    | Table Index        |
| Visual       | Figure Index       |
| Mathematical | Equation Index     |
| Comparison   | Multiple Documents |

Step 2: Hybrid Retrieval

The system combines multiple retrieval strategies.

Dense Retrieval

Captures:

Semantic similarity
Concept relationships
Meaning similarity
Sparse Retrieval

Using BM25:

Captures:

Exact keywords
Gene names
Equations
Model names

Final ranking:
Score =

Dense Similarity

+

Keyword Match

+

Metadata Boost

+

Citation Priority

Step 3: Parent-Child Expansion

Example:

Retrieved chunk:
Chunk 45:

"Accuracy improved by 12%"

Expanded context:
Parent Section:

4. Experimental Results


Related Evidence:

Figure 5

Table 2

Methodology Section

Step 4: Context Assembly

Final VLM prompt:

[Relevant Paragraphs]


[Related Tables]


[Figures]


[Equations]


[User Question]

Flow 3: Multimodal Generation Flow
Purpose

Generate reliable research answers.

Generation Sequence

Retrieved Evidence

        ↓

Vision Language Model

        ↓

Reasoning

        ↓

Citation Validation

        ↓

Final Answer


VLM Requirements

The model must:

Use retrieved evidence only.
Cite factual statements.
Express uncertainty.
Avoid unsupported conclusions.

Example Output
The Transformer architecture reduced latency by 18%.

Evidence:

[Source:
Paper A,
Section 4.2,
Figure 4]

The improvement was measured on
the ImageNet benchmark.

Flow 4: Evidence Verification Flow
Purpose

Allow researchers to validate AI responses.

User Action

User clicks:
[Source: Figure 4]

System Response
Answer

↓

Citation ID

↓

PDF Page

↓

Highlight Bounding Box

↓

Original Figure

↓

Caption

Verification Interface
| Evidence | Location   |
| -------- | ---------- |
| Text     | Page 7     |
| Figure   | Figure 4   |
| Table    | Table 2    |
| Equation | Equation 8 |


Flow 5: Multi-Document Comparison Flow
Purpose

Compare multiple research papers.

User Action

Select:
Paper A

+

Paper B

+

Paper C

System Workflow
Retrieve Evidence

        ↓

Align Concepts

        ↓

Compare Metrics

        ↓

Identify Differences

        ↓

Generate Summary

Example Output
| Topic    | Paper A  | Paper B     |
| -------- | -------- | ----------- |
| Dataset  | ImageNet | COCO        |
| Accuracy | 91%      | 93%         |
| Method   | CNN      | Transformer |

Flow 6: Export Workflow
Supported Outputs
Markdown report
PDF summary
BibTeX references
CSV extracted tables
Research notes

Export Pipeline
Selected Findings

        ↓

Citation Collection

        ↓

Formatting Engine

        ↓

Export File

Flow 7: Administration & Monitoring Flow
System Operators Monitor
Ingestion

Metrics:

Queue status
Failed documents
Processing duration
Vector Database

Metrics:

Collection size
Index health
Search latency
AI Models

Metrics:

Active VLM
Embedding model
Token consumption

Flow 8: Failure Handling
Parsing Failure

Example:
Unreadable PDF

Action:
Fallback OCR

        ↓

Manual Review Queue

Retrieval Failure

Example:
No supporting evidence found

Response:
I could not find sufficient evidence
in the indexed documents.

Vision Failure

Example:
Figure interpretation uncertain

Action:
Request human verification

Flow 9: Security Architecture Flow
flowchart TD

User

-->

Authentication

-->

Authorization

-->

Document Permissions

-->

RAG Pipeline

-->

Audit Logging

Security Requirements

The system must support:

User-level document permissions
Collection isolation
Audit logging
Encryption at rest
Private deployment options

Flow 10: End-to-End System Summary
Researcher

↓

Upload Papers

↓

Layout Understanding

↓

Multimodal Extraction

↓

Multi-Index Storage

↓

Hybrid Retrieval

↓

Evidence Assembly

↓

Vision Language Reasoning

↓

Citation Validation

↓

Research Answer

↓

Export / Collaboration

Final Architecture Principle

A production research RAG system should not behave like a chatbot.

It should behave like:

A scientific research assistant with memory, evidence tracking, multimodal understanding, and transparent reasoning.

This file can serve as the architecture reference for:
- backend implementation
- API design
- frontend workflow mapping
- engineering onboarding
- system design reviews
- investor/technical documentation.