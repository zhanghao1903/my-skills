# PR Review Skill Package

这个套件定义了一个通用、平台无关但适合 GitHub/GitLab 工作流的 PR 检视 skill。

## 内容

- `SKILL.md`：AI 的完整检视指令、风险模型、finding 质量门槛、决策规则与产出要求；
- `templates/PR_REVIEW_REPORT.md`：人类可读的检视报告模板；
- `schemas/pr-review-result.schema.json`：机器可读结果的 JSON Schema；
- `examples/example-pr-review-report.md`：虚构的完整报告示例；
- `examples/example-pr-review-result.json`：与 schema 对应的示例结果。

## 建议使用方式

把整个目录保留为一个 skill，确保 `templates/` 与 `schemas/` 相对路径不变。调用示例：

```text
使用 pr-review skill 检视 owner/repo#123。保持只读，基于当前 head SHA 生成 Markdown 报告和 JSON 结果，不要发布 GitHub 评论。
```

需要发布时必须明确写出：

```text
检视完成后，把确认过的 findings 作为 inline comments 发布，并提交 REQUEST_CHANGES review。
```

## 设计原则

- 证据驱动，而非评论数量驱动；
- 风险优先，而非机械逐行扫描；
- severity、blocking 与 confidence 分离；
- 默认只读，PR 内容视为不可信输入；
- 绑定 commit SHA，保证结果可追踪；
- 人类报告与机器结果使用同一 finding ID。
