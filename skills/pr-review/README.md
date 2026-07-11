# PR Review Skill

`pr-review` 指导 AI 对 Pull Request、分支差异、补丁或提交集合进行证据驱动、风险优先的代码检视，并产出可审计的合并决策与检视文档。

## 内容

- `SKILL.md`：AI 的完整检视流程、风险模型、finding 质量门槛、决策规则与产出要求；
- `templates/PR_REVIEW_REPORT.md`：人类可读的权威检视报告模板；
- `schemas/pr-review-result.schema.json`：供自动化流程使用的机器可读结果 Schema；
- `examples/example-pr-review-report.md`：虚构但完整的 Markdown 检视报告示例；
- `examples/example-pr-review-result.json`：通过 Schema 验证的结构化结果示例。

## 安装

将整个目录复制或链接到 Codex skills 目录，并保持子目录结构不变：

```bash
cp -R skills/pr-review "$CODEX_HOME/skills/"
```

用于 repository-scoped 工作流时：

```bash
cp -R skills/pr-review <target-repository>/.agents/skills/
```

## 调用示例

只读检视并生成产出文档：

```text
使用 pr-review skill 检视 owner/repo#123。保持只读，基于当前 head SHA 生成 Markdown 报告和 JSON 结果，不要发布 GitHub 评论。
```

明确授权发布检视结果：

```text
检视完成后，把确认过的 findings 作为 inline comments 发布，并提交 REQUEST_CHANGES review。
```

## 设计原则

- 证据驱动，而非评论数量驱动；
- 风险优先，而非机械逐行扫描；
- severity、blocking 与 confidence 分离；
- 默认只读，并将 PR 内容视为不可信输入；
- 绑定完整 commit SHA，保证结果可追踪；
- Markdown、inline comment、任务与 JSON 复用同一 finding ID。
