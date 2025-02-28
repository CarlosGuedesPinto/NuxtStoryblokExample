<template>
  <div
    v-editable="blok"
    class="component-table"
  >
    <h1 v-if="blok.title" class="ldtech component-table__title" v-html="formatText(blok.title)" />
    <div class="component-table__table" ref="tableContainer" v-if="blok.orientation === 'vertical'">
      <table>
        <thead>
          <tr class="component-table__header extrabold" :class="{ 'component-table__header--headersBlack': blok.tableHeadersColor === 'black' }"> 
            <td v-for="(row, tdHeadIndex) in blok.table.thead" :key="tdHeadIndex" :class="{
                'sticky-cell text-left': blok.lockedColumns && tdHeadIndex < blok.lockedColumns,
                'td--scroll-second text-left': blok.lockedColumns && tdHeadIndex === blok.lockedColumns - 1 && blok.lockedColumns > 0,
              }" :style="getStickyStyle(tdHeadIndex)">
              <span v-html="formatText(row.value)" />
            </td>
          </tr>
        </thead>
        <tbody class="component-table__body extralight">
          <tr v-for="(row, trIndex) in blok.table.tbody" :key="trIndex">
            <td v-for="(cell, tdBodyIndex) in row.body" :key="index" :class="{
                'sticky-cell text-left': blok.lockedColumns && tdBodyIndex < blok.lockedColumns,
                'td--scroll-second text-left': blok.lockedColumns && tdBodyIndex === blok.lockedColumns - 1 && blok.lockedColumns > 0,
              }" :style="getStickyStyle(tdBodyIndex)">
              <span v-html="formatText(cell.value)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="component-table__table" ref="tableContainer" v-else>
      <table>
        <tbody class="component-table__body component-table__horizontal extralight">
          <tr v-for="(row, index) in blok.table.tbody" :key="index">
            <td v-for="(cell, index) in row.body" :key="index" :class="{
                'content-start': index === 0 && blok.tableHeadersColor === 'black',
                'content-start component-table__blue-content': index === 0 && blok.tableHeadersColor === 'blue',
              }">
              <span v-html="formatText(cell.value)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <span v-if="blok.footer" class="extralight component-table__footer" v-html="formatText(blok.footer)" />
  </div>
</template>

<script setup>
import "./Table.scss";
import { formatText } from '~/src/helpers/text';

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const firstColumnWidth = ref(0);

function getStickyStyle (index) {
  if (index === 0) {
    return { left: '0px' };
  } else if (index === 1 && Number(props.blok.lockedColumns) > 1) {
    return { left: firstColumnWidth.value + 'px' };
  }
  return {};
}

onMounted(async () => {
  await nextTick();
  const firstTd = document.querySelector('td:first-child');
  if (firstTd) {
    firstColumnWidth.value = firstTd.offsetWidth;
  }
});
</script>