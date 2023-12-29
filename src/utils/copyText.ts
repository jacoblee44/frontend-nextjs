export function copyText(text: string, onSuccess: () => void, onError: ((error: any) => void) | undefined = undefined) {
  navigator.clipboard.writeText(text).then(function () {
    onSuccess();
  }, function (error) {
    if (onError) {
      onError(error);
    }
  });
}