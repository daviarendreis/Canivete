import { Flex } from "@radix-ui/themes";
import { ClockIcon, Pencil2Icon, TextAlignLeftIcon } from "@radix-ui/react-icons";
import { Input, SegmentedControl } from "glisse";
import { useState } from "react";
import type { Task } from "../types/task";
import type { Priority } from "../types/priority";

interface TaskFormProps {
    task?: Task
}

export default function TaskForm ({ task }: TaskFormProps) {
    const [priority, setPriority] = useState<Priority>(task ? task.priority : 'low')

    return (
        <Flex direction={'column'} gap={'4'}>
            <label className="field" htmlFor={ task ? `edit-name-${task.id}` : 'name'}>
                <span className="field-label">Task</span>
                <Input
                    icon={<Pencil2Icon/>}
                    placeholder="What needs to be done?"
                    name="name" id={ task ? `edit-name-${task.id}` : 'name'}
                    defaultValue={ task ? task.name : ''}
                    required
                />
            </label>

            <label className="field" htmlFor={ task ? `edit-description-${task.id}` : 'description'}>
                <span className="field-label">Description</span>
                <Input
                    icon={<TextAlignLeftIcon/>}
                    placeholder="Add a short description"
                    name="description" id={ task ? `edit-description-${task.id}` : 'description'}
                    defaultValue={ task ? task.description : ''}
                    required
                />
            </label>

            <label className="field" htmlFor={ task ? `edit-time-${task.id}` : 'time'}>
                <span className="field-label">Time</span>
                <Input
                    icon={<ClockIcon/>}
                    type="time"
                    name="time" id={ task ? `edit-time-${task.id}` : 'time'}
                    defaultValue={ task ? task.time : ''}
                />
            </label>

            <div className="field">
                <span className="field-label">Priority</span>
                <SegmentedControl
                    aria-label="Priority"
                    items={[
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' },
                    ]}
                    value={priority}
                    onValueChange={(value) => setPriority(value as Priority)}
                />
                <input type="hidden" name="priority" value={priority} />
            </div>
        </Flex>
    )
}
