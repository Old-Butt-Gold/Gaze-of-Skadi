import { useQuery } from '@tanstack/react-query';
import { commonService } from '../../services/commonService';
import type {RecordDto, RecordField} from "../../types/records.ts";

export const useRecords = (field: RecordField) => {
  return useQuery<RecordDto[], Error>({
    queryKey: ['common', 'records', field],
    queryFn: () => commonService.getRecordsByField(field),
    staleTime: 1000 * 60 * 5, // 5 минут,
    retry: 1,
  });
};
