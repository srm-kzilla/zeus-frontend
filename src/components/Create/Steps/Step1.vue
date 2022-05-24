<template>
  <FormKit name="title" label="Title" validation="required" />
  <FormKit name="tagline" label="Tagline" validation="required" />
  <FormKit
    type="file"
    name="eventCoverUpload"
    label="Event Cover"
    accept=".png,.jpg,.jpeg"
  />
</template>
