# Contract Authority

The configured IdeaTrace server's live `GET /openapi.json` response is the
runtime route, request, response, and stable-error authority. Read it before a
write when the client has not already verified the current server contract.

This plugin was packaged against the independently reviewed IdeaTrace head
`ef4485b6d25c9f799c9422d45b96b6e38c78c3e1`, canonically squash-merged as
`0c4c30410e9a2cc2c848047214654ab9df2585a2`. Its pinned compatibility contract
can be inspected at:

- [LP-03 OpenAPI snapshot](https://github.com/zhanghao1903/idea-trace-validation/blob/0c4c30410e9a2cc2c848047214654ab9df2585a2/openapi/lp03.v1.json)
- [structured report schema](../../../schemas/structured-report.v1.schema.json)

The live API takes precedence for the configured server, but it must expose the
workflow and safety boundaries described by this Skill. If the live contract is
missing, cannot express the confirmed intent, or materially differs from the
pinned compatibility surface, stop and report the mismatch. Do not invent a
route, field, credential, or fallback write.

The API base URL and AI bearer credential come from secure operator
configuration. Neither is embedded in this plugin. Human-control tokens and
capability cookies are never AI inputs.
