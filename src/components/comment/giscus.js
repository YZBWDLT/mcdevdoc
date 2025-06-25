import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComment() {
  const { colorMode } = useColorMode();

  return (
    <Giscus    
      repo="YZBWDLT/mcdevdoc"
      repoId="R_kgDOOIcMJg"
      categoryId="DIC_kwDOOIcMJs4CqaqB"
      mapping="pathname"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme={colorMode}
      lang="zh-CN"
      crossorigin="anonymous"
      async
    />
  );
}