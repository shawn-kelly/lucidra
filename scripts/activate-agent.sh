#!/bin/bash
AGENT=$1
npx claude-code-templates@latest --agent=$AGENT --yes
