import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface InlineFormProps {
  onSubmit(title: string): void;

  title?: string;
  className?: string;
  inputType?: 'input' | 'textarea';
  inputPlaceholder?: string;
  defaultText?: string;
  hasButton?: boolean;
  buttonText?: string;
}

export const InlineForm: React.FC<InlineFormProps> = ({
  onSubmit,
  title = '',
  className,
  inputType = 'input',
  inputPlaceholder = '',
  defaultText = 'Not defined',
  hasButton = false,
  buttonText = 'Submit',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const activateEditing = () => {
    setIsEditing(true);
  };

  const { handleSubmit, register, reset } = useForm<{
    title: string;
  }>({ defaultValues: { title } });
  const onSubmitHandler = handleSubmit((data) => {
    if (data.title) onSubmit(data.title);

    setIsEditing(false);
    reset();
  });

  let containerClasses = 'inline-form-container';
  if (isEditing) containerClasses += ' inline-form-container-editing';

  return (
    <div className={className ? className : undefined}>
      <div onClick={activateEditing} className={containerClasses}>
        {!isEditing && <div className="inline-form-text">{defaultText}</div>}
        {isEditing && (
          <form className="inline-form" onSubmit={onSubmitHandler}>
            {inputType === 'input' && (
              <input
                type="text"
                className="inline-form-input"
                placeholder={inputPlaceholder}
                {...register('title')}
              />
            )}
            {inputType === 'textarea' && (
              <textarea className="inline-form-input" {...register('title')} />
            )}
            {hasButton && (
              <button type="submit" className="inline-form-button">
                {buttonText}
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
