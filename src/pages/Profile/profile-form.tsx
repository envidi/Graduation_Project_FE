// import { Link } from 'react-router-dom'
// import { zodResolver } from '@hookform/resolvers/zod'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm, SubmitHandler } from 'react-hook-form'
// import { z } from 'zod'x

import { updateClient } from '@/api/auth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Joi from 'joi'
// import { Textarea } from '@/components/ui/textarea'
// import { toast } from '@/registry/new-york/ui/use-toast'
import { toast } from 'react-toastify'
import { ContextAuth, ContextMain } from '@/context/Context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'

interface UserUpdateType {
  name: string
  email: string
  address: string
  mobile: string | number
}

const profileFormSchema = Joi.object({
  name: Joi.string().min(2).max(30).label('Username').messages({
    'string.empty': 'Required username',
    'string.min': '{{#label}} must be at least 2 characters',
    'string.max': '{{#label}} can only be up to 30 characters.'
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .label('Email')
    .messages({
      'string.empty': 'Required email',
      'string.email': '{{#label}} must be a valid email'
    }),
  address: Joi.string().label('Address').required().min(4).messages({
    'string.empty': 'Required address',
    'string.min': '{{#label}} can only be up to 4 characters.'
  }),
  mobile: Joi.number().label('Mobile')
  // bio: Joi.string().label('Bio').max(160).messages({
  //   'string.empty': 'Required bio'
  // })
})

// This can come from your database or API.

export function ProfileForm() {
  const { userDetail } = useContext<ContextAuth>(ContextMain)
  const userUpdate = useMutation({
    mutationFn: async (user: UserUpdateType) => updateClient(user),
    onSuccess() {
      toast.success('Update Successfully <3 ')
    },
    onError() {
      toast.error('Update faile, try again !!!!!!!')
    }
  })
  const defaultValues = {
    name: userDetail.message.name,
    email: userDetail.message.email,
    address: userDetail.message?.address || '',
    mobile: userDetail.message?.mobile || 0
  }
  const form = useForm({
    resolver: joiResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<{
    name: string
    email: string
    address: string
    mobile: string | number
  }> = (data) => {
    userUpdate.mutate({ ...data })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  {...field}
                  className="py-7 text-2xl border-border-borderProfileContain"
                />
              </FormControl>
              <FormDescription className="text-xl">
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage className="text-xl" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email..."
                  {...field}
                  className="py-7 text-2xl border-border-borderProfileContain"
                />
              </FormControl>
              <FormDescription className="text-xl">
                This is your public display email. It can be your email or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage className="text-xl" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Hanoi Nam Tu Liem street"
                  {...field}
                  className="py-7 text-2xl border-border-borderProfileContain"
                />
              </FormControl>
              <FormDescription className="text-xl">
                This is your public display your address. It can be your real
                name or a pseudonym. You can only change this once every 30
                days.
              </FormDescription>
              <FormMessage className="text-xl" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Mobile</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your number phone..."
                  {...field}
                  className="py-7 text-2xl border-border-borderProfileContain"
                />
              </FormControl>
              <FormDescription className="text-xl">
                This is your public display your number phone. It can be your
                real name or a pseudonym. You can only change this once every 30
                days.
              </FormDescription>
              <FormMessage className="text-xl" />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none py-7 text-2xl border-border-borderProfileContain"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-2xl">
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage className="text-xl" />
            </FormItem>
          )}
        /> */}

        <Button
          type="submit"
          className="dark:bg-background-secondary bg-neutral-800 text-2xl px-7 py-4"
        >
          Update profile
        </Button>
      </form>
    </Form>
  )
}
